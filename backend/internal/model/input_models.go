package model

import "time"

type RegisterInput struct {
	Name            string `json: "name" binding:"required"`
	Email           string `json: "email" binding:"required"`
	Role            string `json:"role" binding:"required"`
	Password        string `json:"password" binding:"required,min=8"`
	ConfirmPassword string `json:"confirm_password" binding:"required,min=8,eqfield=Password"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UpdateUserInput struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
}

type CreateContractRequest struct {
	ContractType           string        `json:"contractType" binding:"required"`
	CompanyName            string        `json:"companyName" binding:"required"`
	EstimatedContractValue float64       `json:"estimatedContractValue" binding:"required"`
	StartDate              time.Time     `json:"startDate" binding:"required"`
	EndDate                time.Time     `json:"endDate" binding:"required"`
	Description            string        `json:"description" binding:"required"`
	Priority               PriorityLevel `json:"priority" binding:"required,oneof=low medium high"`
}