package service

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/repository"
	"errors"
	"log"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	UserRepository *repository.UserRepository
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{
		UserRepository: repository.NewUserRepository(db),
	}
}

func (s *UserService) CreateUser(input model.RegisterInput) (*model.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

	if err != nil {
		return nil, err
	}

	user := model.User{Name: input.Name, Email: input.Email, Password: string(hash), Role: input.Role}
	if err := s.UserRepository.CreateUser(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *UserService) CreateDefaultAdmin() {
	_, err := s.UserRepository.FindByEmail("admin@example.com")
	if err == nil {
		log.Println("Default admin user already exists.")
		return
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		log.Printf("Error checking for default admin: %v", err)
		return
	}

	log.Println("Creating default admin user...")
	if _, err := s.CreateUser(model.RegisterInput{
		Name:            "admin",
		Email:           "admin@example.com",
		Role:            "AdminTeam",
		Password:        "Admin123",
		ConfirmPassword: "Admin123",
	}); err != nil {
		log.Printf("Failed to create default admin user: %v", err)
		return
	}
	log.Println("Default admin user created successfully.")
}

func (s *UserService) UpdateUser(id uint, newName, newEmail, newRole string) error {
	user, err := s.UserRepository.FindById(id)
	if err != nil {
		return err
	}

	user.Email = newEmail
	user.Role = newRole
	user.Name = newName

	return s.UserRepository.SaveUser(user)

}

func (s *UserService) GetAllUsers() ([]*model.User, error) {
	return s.UserRepository.GetAllUsers()
}

func (s *UserService) GetUserByEmail(email string) (*model.User, error) {
	return s.UserRepository.FindByEmail(email)
}

func (s *UserService) GetUserByID(id uint) (*model.User, error) {
	return s.UserRepository.FindById(id)
}

func (s *UserService) DeleteUser(id uint) error {
	return s.UserRepository.DeleteUser(id)
}
