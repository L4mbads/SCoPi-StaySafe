package model

type RegisterInput struct {
	Name            string `json: "name" binding:"required"`
	Email           string `json: "email" binding:"required"`
    Role    string `json:"role" binding:"required"`
	Password        string `json:"password" binding:"required,min=8"`
	ConfirmPassword string `json:"confirm_password" binding:"required,min=8,eqfield=Password"`
}
