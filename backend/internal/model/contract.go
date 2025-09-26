package model

import "gorm.io/gorm"

type Contract struct {
	gorm.Model
	Title    string `json:"title"`
	Status   string `json:"status"`
	Filepath string `json:"filepath"`
	UserID   uint   `json:"user_id"` // Foreign key for User
	User     User   `gorm:"foreignKey:UserID" json:"user"`
}
