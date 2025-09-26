package repository

import (
	"SCoPi-backend/internal/model"

	"gorm.io/gorm"
)

type ContractRepository struct {
	DB *gorm.DB
}

func NewContractRepository(db *gorm.DB) *ContractRepository {
	return &ContractRepository{DB: db}
}

func (cr *ContractRepository) CreateContract(c *model.Contract) (*model.Contract, error) {
	err := cr.DB.Create(c).Error
	if err != nil {
		return nil, err
	}
	cr.DB.Preload("User").First(c, c.ID)
	return c, nil
}

func (cr *ContractRepository) GetAllContracts() ([]model.Contract, error) {
	var contracts []model.Contract
	if err := cr.DB.Preload("User").Find(&contracts).Error; err != nil {
		return nil, err
	}
	return contracts, nil
}

func (cr *ContractRepository) GetContractByID(id uint) (*model.Contract, error) {
	var contract model.Contract
	if err := cr.DB.Preload("User").First(&contract, id).Error; err != nil {
		return nil, err
	}
	return &contract, nil
}

func (cr *ContractRepository) UpdateContract(contract *model.Contract) (*model.Contract, error) {
	err := cr.DB.Save(contract).Error
	if err != nil {
		return nil, err
	}
	cr.DB.Preload("User").First(contract, contract.ID)
	return contract, nil
}

func (cr *ContractRepository) DeleteContract(id uint) error {
	return cr.DB.Delete(&model.Contract{}, id).Error
}
