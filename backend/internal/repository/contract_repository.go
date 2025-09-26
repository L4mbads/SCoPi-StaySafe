package repository

import "gorm.io/gorm"

type ContractRepository struct {
	DB *gorm.DB
}

func NewContractRepository(db *gorm.DB) *ContractRepository {
	return &ContractRepository{DB: db}
}
