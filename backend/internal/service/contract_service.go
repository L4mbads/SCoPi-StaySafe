package service

import (
	"SCoPi-backend/internal/model"
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

// CreateContract handles the business logic for creating a contract.
func (s *ContractService) CreateContract(contract *model.Contract) (*model.Contract, error) {
	return s.ContractRepository.CreateContract(contract)
}

// GetAllContracts retrieves all contracts.
func (s *ContractService) GetAllContracts() ([]model.Contract, error) {
	return s.ContractRepository.GetAllContracts()
}

// GetContractByID retrieves a contract by its ID.
func (s *ContractService) GetContractByID(id uint) (*model.Contract, error) {
	return s.ContractRepository.GetContractByID(id)
}

// UpdateContract handles the business logic for updating a contract.
func (s *ContractService) UpdateContract(id uint, updatedData *model.Contract) (*model.Contract, error) {
	// First, find the existing contract
	existingContract, err := s.ContractRepository.GetContractByID(id)
	if err != nil {
		return nil, err // Error will be gorm.ErrRecordNotFound if it doesn't exist
	}

	// Update the fields
	existingContract.Title = updatedData.Title
	existingContract.Status = updatedData.Status
	existingContract.Filepath = updatedData.Filepath
	// You might want to add logic to prevent UserID from being changed, or handle it specifically.
	existingContract.UserID = updatedData.UserID

	// Save the updated contract
	return s.ContractRepository.UpdateContract(existingContract)
}

// DeleteContract deletes a contract by its ID.
func (s *ContractService) DeleteContract(id uint) error {
	// You could add business logic here, e.g., check if the contract can be deleted.
	return s.ContractRepository.DeleteContract(id)
}
