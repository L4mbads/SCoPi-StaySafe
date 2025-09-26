package model

import "time"

type RegisterInput struct {
	Name            string `json:"name" binding:"required"`
	Email           string `json:"email" binding:"required"`
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
	ContractTitle          string        `json:"contract_title" binding:"required"`
	CompanyName            string        `json:"company_name" binding:"required"`
	CompanyAddress         string        `json:"company_address" binding:"required"`
	ClientName             string        `json:"client_name" binding:"required"`
	ClientTitle            string        `json:"client_title"`
	EstimatedContractValue float64       `json:"estimatedContractValue" binding:"required"`
	StartDate              time.Time     `json:"startDate" binding:"required"`
	EndDate                time.Time     `json:"endDate" binding:"required"`
	ServiceDescription     string        `json:"service_description" binding:"required"`
	FinalDeliverables      string        `json:"final_deliverables" binding:"required"`
	Priority               PriorityLevel `json:"priority" binding:"required,oneof=low medium high"`
}
