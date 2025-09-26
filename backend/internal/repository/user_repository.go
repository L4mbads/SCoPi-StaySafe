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

func (ur *UserRepository) DeleteUser(id uint) error {
	result := ur.DB.Delete(&model.User{}, id)
	return result.Error
}
