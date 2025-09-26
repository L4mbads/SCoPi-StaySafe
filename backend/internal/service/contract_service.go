package service

import (
	"SCoPi-backend/internal/ai"
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/repository"
	"context"
	"errors"
	"fmt"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"

	"code.sajari.com/docconv"
	"github.com/gin-gonic/gin"
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
func (s *ContractService) UploadAndCreateContract(userID uint, input model.ContractCreateInput, file *multipart.FileHeader) (*model.Contract, error) {
	storagePath := "./contract_storage"
	if _, err := os.Stat(storagePath); os.IsNotExist(err) {
		os.Mkdir(storagePath, os.ModePerm)
	}

	fileExt := filepath.Ext(file.Filename)
	uniqueFilename := fmt.Sprintf("%d", userID) + file.Filename + fileExt
	filePath := filepath.Join(storagePath, uniqueFilename)

	err := s.saveFile(file, filePath)
	if err != nil {
		return nil, err
	}

	contract := &model.Contract{
		Title:    input.Title,
		Status:   model.Draft, // Default status for a newly uploaded contract
		Filepath: filePath,
		UserID:   userID,
	}

	_, err = s.ContractRepository.CreateContract(contract)
	if err != nil {
		os.Remove(filePath)
		return nil, errors.New("failed to create contract record")
	}

	return contract, nil
}

func (s *ContractService) saveFile(file *multipart.FileHeader, filePath string) error {
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	dst, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer dst.Close()

	if _, err = dst.ReadFrom(src); err != nil {
		return err
	}
	return nil
}

func (s *ContractService) GetContractByID(id uint) (*model.Contract, error) {
	contract, err := s.ContractRepository.GetContractByID(id)
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("contract not found")
	}
	return contract, err
}

func (s *ContractService) GetAllContracts() ([]*model.Contract, error) {
	return s.ContractRepository.GetAllContracts()
}

func (s *ContractService) UpdateContract(id uint, input model.ContractUpdateInput) error {
	contract, err := s.GetContractByID(id)
	if err != nil {
		return err
	}

	if input.Title != "" {
		contract.Title = input.Title
	}

	if input.Status != "" {
		var status model.ContractStatus
		if err := status.UnmarshalJSON([]byte(`"` + input.Status + `"`)); err != nil {
			return errors.New("invalid status value")
		}
		contract.Status = status
	}

	_, err = s.ContractRepository.UpdateContract(contract)
	return err
}

func (s *ContractService) DeleteContract(id uint) error {
	contract, err := s.GetContractByID(id)
	if err != nil {
		return err
	}

	if contract.Filepath != "" {
		if err := os.Remove(contract.Filepath); err != nil {
			gin.SetMode(gin.DebugMode)
			log.Printf("Warning: Failed to delete file %s: %v", contract.Filepath, err)
		}
	}

	return s.ContractRepository.DeleteContract(id)
}

func (s *ContractService) AnalyzeContract(ctx context.Context, contractID uint) (string, error) {
	if ai.Client == nil {
		return "", errors.New("AI client is not initialized")
	}

	contract, err := s.ContractRepository.GetContractByID(contractID)
	if err != nil {
		return "", fmt.Errorf("contract not found: %w", err)
	}

	// contractContent, err := os.ReadFile(contract.Filepath)
	// if err != nil {
	// 	return "", fmt.Errorf("failed to read contract file %s: %w", "sample_contract.txt", err)
	// }

	// contractContent, err := extractTextFromPDF(contract.Filepath)
	// if err != nil {
	// 	log.Fatalf("Error extracting text: %v", err)
	// }
	contractContent, err := docconv.ConvertPath(contract.Filepath)
	if err != nil {
		log.Fatal(err)
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
`, string(contractContent.Body))

	analysis, err := ai.Client.GenerateContent(ctx, "gemini-2.5-pro", prompt)
	if err != nil {
		return "", fmt.Errorf("AI analysis failed: %w", err)
	}

	// var analysis model.ContractAnalysis
	// if err := json.Unmarshal([]byte(analysisJSON), &analysis); err != nil {
	// 	return nil, fmt.Errorf("failed to parse AI response: %w. Raw response: %s", err, analysisJSON)
	// }

	return analysis, nil
}
