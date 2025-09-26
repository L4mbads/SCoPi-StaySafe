package repository

import (
	"SCoPi-backend/internal/model"

	"gorm.io/gorm"
)

type ContractRequestRepository struct {
	DB *gorm.DB
}

func NewContractRequestRepository(db *gorm.DB) *ContractRequestRepository {
	return &ContractRequestRepository{
		DB: db,
	}
}

func (r *ContractRequestRepository) Create(contractRequest *model.ContractRequest) error {
	return r.DB.Create(contractRequest).Error
}

func (r *ContractRequestRepository) GetAllContractRequests() ([]*model.ContractRequest, error) {
	var cr []*model.ContractRequest
	if err := r.DB.Find(&cr).Error; err != nil {
		return nil, err
	}
	return cr, nil
}

func (r *ContractRequestRepository) GetContractRequestByID(id uint) (*model.ContractRequest, error) {
	var cr model.ContractRequest
	err := r.DB.Where("ID = ?", id).First(&cr).Error
	if err != nil {
		return nil, err
	}
	return &cr, nil
}
