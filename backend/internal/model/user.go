package model

// User struct represents a user in the database.
type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Email    string `gorm:"uniqueIndex" json:"email"`
	Password string `json:"-"` // We don't want to expose the password
	Role     string `json:"role"`
}
