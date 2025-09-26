package repository

import (
	"SCoPi-backend/internal/model"

	"gorm.io/gorm"
)

type UserRepository struct {
	DB *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (ur *UserRepository) CreateUser(user *model.User) error {
	return ur.DB.Create(user).Error
}

func (ur *UserRepository) GetAllUsers() ([]*model.User, error) {
	var users []*model.User
	if err := ur.DB.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (ur *UserRepository) SaveUser(user *model.User) error {
	return ur.DB.Save(user).Error
}

func (ur *UserRepository) DeleteUser(id uint) error {
	result := ur.DB.Delete(&model.User{}, id)
	return result.Error
}

func (ur *UserRepository) FindByEmail(email string) (*model.User, error) {
	var user model.User
	err := ur.DB.Where("Email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (ur *UserRepository) FindById(id uint) (*model.User, error) {
	var user model.User
	err := ur.DB.Where("ID = ?", id).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
