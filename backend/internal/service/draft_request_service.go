package service

import (
	"SCoPi-backend/internal/ai"
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/pkg"
	"SCoPi-backend/internal/repository"
	"context"
	"log"

	"gorm.io/gorm"
)

type DraftRequestService struct {
	ContractRequestRepository repository.ContractRequestRepository
	ContractRepository        repository.ContractRepository
}

func NewDraftRequestService(db *gorm.DB) *DraftRequestService {
	return &DraftRequestService{
		ContractRequestRepository: *repository.NewContractRequestRepository(db),
		ContractRepository:        *repository.NewContractRepository(db),
	}
}

func (drs *DraftRequestService) GenerateDraftFromContractRequest(cr model.ContractRequest) error {
	prompt := `Instruction:

Generate a complete HTML document for a comprehensive Template Service Agreement.
Use semantic HTML tags (h1, h2, p, ul, li).
Include inline CSS styles for proper spacing and readability in PDF format.
Output only valid HTML content, no Markdown or plain text.

The contract must include the following sections:

Title of the Contract: SERVICE AGREEMENT

Date: The effective date of the contract.

Parties Involved: Names and addresses for both parties.

Recitals: The purpose of the contract.

Definitions: Key terms used in the contract.

Terms and Conditions: Obligations, deliverables, timelines, and payment terms.

Confidentiality Clause: Confidentiality obligations.

Termination Clause: Conditions for termination.

Dispute Resolution: Process for resolving disputes.

Governing Law: The governing jurisdiction.

Signatures: Placeholder text for signatures, names, and dates.

Make the layout printable and PDF-friendly.`

	ctx := context.Background()

	log.Println("Thinking....")

	htmlContent, err := ai.Client.GenerateContent(ctx, "gemini-2.5-pro", prompt)
	if err != nil {
		log.Fatalf("Error generating HTML content from Gemini: %v", err)
		return err
	}

	if err := pkg.GeneratePDFHandler(htmlContent, cr.ContractTitle+"-"+cr.CompanyName+"-"+cr.StartDate.String()+".pdf"); err != nil {
		return err
	}

	return nil
}
