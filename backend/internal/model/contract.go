package model

import (
	"encoding/json"
	"fmt"

	"gorm.io/gorm"
)

type ContractStatus int

const (
	Draft ContractStatus = iota
	Active
	Expired
)

func (cs ContractStatus) String() string {
	switch cs {
	case Draft:
		return "Draft"
	case Active:
		return "Active"
	case Expired:
		return "Expired"
	default:
		return "Unknown"
	}
}

func (cs ContractStatus) MarshalJSON() ([]byte, error) {
	return json.Marshal(cs.String())
}

func (cs *ContractStatus) UnmarshalJSON(data []byte) error {
	var s string
	if err := json.Unmarshal(data, &s); err != nil {
		return err
	}

	switch s {
	case "Draft":
		*cs = Draft
	case "Active":
		*cs = Active
	case "Expired":
		*cs = Expired
	default:
		return fmt.Errorf("invalid contract status: %s", s)
	}
	return nil
}

type Contract struct {
	gorm.Model
	Title    string         `json:"title"`
	Status   ContractStatus `json:"status"`
	Filepath string         `json:"filepath"`
	UserID   uint           `json:"user_id"` // Foreign key for User
	User     User           `gorm:"foreignKey:UserID" json:"user"`
}

type ContractAnalysis struct {
	ComplianceReport ComplianceReport `json:"compliance_report"`
}

type ComplianceReport struct {
	GovernmentRegulations ComplianceCategory `json:"government_regulations"`
	InternalStandards     ComplianceCategory `json:"internal_standards"`
	RiskAssessments       ComplianceCategory `json:"risk_assessments"`
}

type ComplianceCategory struct {
	Summary        ComplianceSummary `json:"summary"`
	HighRiskIssues []ComplianceIssue `json:"high_risk_issues"`
	LowRiskIssues  []ComplianceIssue `json:"low_risk_issues"`
}

type ComplianceSummary struct {
	TotalClausesNeedingAdjustment int `json:"total_clauses_needing_adjustment"`
	HighRiskCount                 int `json:"high_risk_count"`
	LowRiskCount                  int `json:"low_risk_count"`
}

type ComplianceIssue struct {
	ClauseReference  string `json:"clause_reference"`
	IssueDescription string `json:"issue_description"`
	Recommendation   string `json:"recommendation"`
}
