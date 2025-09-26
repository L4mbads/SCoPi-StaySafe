package service

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/repository"

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

func (s *UserService) DeleteUser(id uint) error {
	return s.UserRepository.DeleteUser(id)
}
