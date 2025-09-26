package model

import "gorm.io/gorm"

// User struct represents a user in the database.
type User struct {
	gorm.Model
	Name     string `json:"name"`
	Email    string `gorm:"uniqueIndex" json:"email"`
	Password string `json:"-"` // We don't want to expose the password
	Role     string `json:"role"`
}
