package service

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/repository"

	"gorm.io/gorm"
)

type ContractRequestService struct {
	ContractRequestRepository repository.ContractRequestRepository
	DraftRequestService       DraftRequestService
}

func NewContractRequestService(db *gorm.DB) *ContractRequestService {
	return &ContractRequestService{
		ContractRequestRepository: *repository.NewContractRequestRepository(db),
	}
}

func (crs *ContractRequestService) CreateContractRequest(input model.CreateContractRequest, userID uint) (*model.ContractRequest, error) {
	cr := model.ContractRequest{
		ContractTitle:      input.ContractTitle,
		CompanyName:        input.CompanyName,
		CompanyAddress:     input.CompanyAddress,
		ClientName:         input.ClientName,
		ClientTitle:        input.ClientTitle,
		EstimatedValue:     input.EstimatedContractValue,
		StartDate:          input.StartDate,
		EndDate:            input.EndDate,
		ServiceDescription: input.ServiceDescription,
		FinalDeliverables:  input.FinalDeliverables,
		Priority:           input.Priority,
		UserID:             userID,
		Status:             model.StatusPending,
	}

	if err := crs.ContractRequestRepository.Create(&cr); err != nil {
		return nil, err
	}

	return &cr, nil
}

func (crs *ContractRequestService) GetAllContractRequests() ([]*model.ContractRequest, error) {
	return crs.ContractRequestRepository.GetAllContractRequests()
}

func (crs *ContractRequestService) GetContractRequestByID(id uint) (*model.ContractRequest, error) {
	return crs.ContractRequestRepository.GetContractRequestByID(id)
}
