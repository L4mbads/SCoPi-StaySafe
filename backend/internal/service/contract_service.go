package service

import (
	"SCoPi-backend/internal/ai"
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/repository"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"

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

func (s *ContractService) AnalyzeContract(ctx context.Context, contractID uint) (*model.ContractAnalysis, error) {
	if ai.Client == nil {
		return nil, errors.New("AI client is not initialized")
	}

	contract, err := s.ContractRepository.GetContractByID(contractID)
	if err != nil {
		return nil, fmt.Errorf("contract not found: %w", err)
	}

	contractContent, err := os.ReadFile(contract.Filepath)
	if err != nil {
		return nil, fmt.Errorf("failed to read contract file %s: %w", "sample_contract.txt", err)
	}

	prompt := fmt.Sprintf(`
## Prompt for 3-Pillar Compliance and Risk Categorization

Role: You are an AI Compliance Analyst.

Task: Analyze the contract provided below based on a three-pillar compliance framework: 1. Government Regulations, 2. Internal Standards, and 3. Risk Assessments. For each pillar, your task is to identify all clauses that require adjustment, count them, and categorize each required adjustment as either High Risk/Urgent or Low Risk/Not Urgent.

Compliance Framework:

Government Regulations: Check the contract for compliance with the following regulations.

[Example Regulation 1, e.g., GDPR Data Processing requirements]

[Example Regulation 2, e.g., Local Labor Laws for contractors]

Internal Standards: Check the contract for adherence to these internal company policies.

Payment terms must not exceed Net 45.

Limitation of Liability must be explicitly stated and capped.

All intellectual property created must be owned by the Company.

Risk Assessments: Review the contract for general legal and commercial risks.

Identify ambiguous or vague language.

Flag one-sided clauses (e.g., unilateral termination rights, broad indemnification).

Identify any uncapped liabilities.

Risk Categorization Rules:

High Risk/Urgent: A clause that violates a law, creates significant financial or legal exposure (like uncapped liability), or severely contradicts a core internal standard.

Low Risk/Not Urgent: A clause that has minor deviations from internal standards, contains slight ambiguity, or could be worded more favorably but does not pose a major immediate threat.

Output Format:

The output must be a single, valid JSON object. The root object should contain a key for each of the three compliance pillars. Each pillar's object must provide a summary count and two lists: one for high-risk issues and one for low-risk issues.

JSON Structure:

JSON


{

  "compliance_report": {

    "government_regulations": {

      "summary": {

        "total_clauses_needing_adjustment": 0,

        "high_risk_count": 0,

        "low_risk_count": 0

      },

      "high_risk_issues": [

        {

          "clause_reference": "Section/Clause Number",

          "issue_description": "Explanation of the regulatory violation.",

          "recommendation": "Action needed to achieve compliance."

        }

      ],

      "low_risk_issues": []

    },

    "internal_standards": {

      "summary": {

        "total_clauses_needing_adjustment": 0,

        "high_risk_count": 0,

        "low_risk_count": 0

      },

      "high_risk_issues": [],

      "low_risk_issues": [

        {

          "clause_reference": "Section/Clause Number",

          "issue_description": "Explanation of the deviation from internal standards.",

          "recommendation": "Action needed to align with company policy."

        }

      ]

    },

    "risk_assessments": {

      "summary": {

        "total_clauses_needing_adjustment": 0,

        "high_risk_count": 0,

        "low_risk_count": 0

      },

      "high_risk_issues": [

        {

          "clause_reference": "Section/Clause Number",

          "issue_description": "Explanation of the commercial or legal risk (e.g., ambiguity, one-sided term).",

          "recommendation": "Suggested revision to mitigate the risk."

        }

      ],

      "low_risk_issues": []

    }

  }

}
  
Here is the contract content:
---
%s
---
`, string(contractContent))

	analysisJSON, err := ai.Client.GenerateContent(ctx, "gemini-2.5-pro", prompt)
	if err != nil {
		return nil, fmt.Errorf("AI analysis failed: %w", err)
	}

	var analysis model.ContractAnalysis
	if err := json.Unmarshal([]byte(analysisJSON), &analysis); err != nil {
		return nil, fmt.Errorf("failed to parse AI response: %w. Raw response: %s", err, analysisJSON)
	}

	return &analysis, nil
}
