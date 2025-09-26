// File: backend/internal/repository/user_repository.go

package repository

import (
	"SCoPi-backend/internal/model"
	"log"

	"gorm.io/gorm"
)

// UserRepository handles all database operations for the User model.
type UserRepository struct {
	DB *gorm.DB
}

// NewUserRepository creates a new repository with the given database connection.
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

// CreateUser saves a new user to the database.
func CreateUser(db *gorm.DB, user *model.User) error {
	return db.Create(user).Error
}

// FindUserByEmail finds a user by their email.
func FindUserByEmail(db *gorm.DB, email string) (*model.User, error) {
	var user model.User
	if err := db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// FindUserByID finds a user by their ID.
func FindUserByID(db *gorm.DB, id uint) (*model.User, error) {
	var user model.User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetAllUsers retrieves all users from the database.
func GetAllUsers(db *gorm.DB) ([]*model.User, error) {
	var users []*model.User
	if err := db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// DeleteUser deletes a user by their ID.
func DeleteUser(db *gorm.DB, id uint) error {
	result := db.Delete(&model.User{}, id)
	return result.Error
}

// UpdateUserRole updates the role of a user.
func UpdateUserRole(db *gorm.DB, id uint, role string) error {
	result := db.Model(&model.User{}).Where("id = ?", id).Update("role", role)
	return result.Error
}

// AutoMigrate migrates the User model to the database.
func (r *UserRepository) AutoMigrate() {
	r.DB.AutoMigrate(&model.User{})
	log.Println("User model migrated successfully.")
}
