package handler

import (
	"SCoPi-backend/internal/service"

	"gorm.io/gorm"
)

type ContractHandler struct {
	ContractService service.ContractService
}

func NewContractHandler(db *gorm.DB) *ContractHandler {
	return &ContractHandler{
		ContractService: *service.NewContractService(db),
	}
}
