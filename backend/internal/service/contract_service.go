package service

import (
	"SCoPi-backend/internal/repository"

	"gorm.io/gorm"
)

type ContractService struct {
	ContractRepository repository.ContractRepository
}

func NewContractService(db *gorm.DB) *ContractService {
	return &ContractService{
		ContractRepository: *repository.NewContractRepository(db),
	}
}
