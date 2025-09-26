package model

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type PriorityLevel int

const (
	Low PriorityLevel = iota
	Medium
	High
)

func (p PriorityLevel) String() string {
	switch p {
	case Low:
		return "Low"
	case Medium:
		return "Medium"
	case High:
		return "High"
	default:
		return "Unknown"
	}
}

func (p PriorityLevel) MarshalJSON() ([]byte, error) {
	return json.Marshal(p.String())
}

func (p *PriorityLevel) UnmarshalJSON(data []byte) error {
	var s string
	if err := json.Unmarshal(data, &s); err != nil {
		return err
	}

	switch s {
	case "Low":
		*p = Low
	case "Medium":
		*p = Medium
	case "High":
		*p = High
	default:
		return fmt.Errorf("invalid priority level: %s", s)
	}
	return nil
}

// ContractRequestStatus defines the enumeration for contract request statuses.
type ContractRequestStatus int

const (
	StatusPending ContractRequestStatus = iota
	StatusInReview
	StatusApproved
	StatusRejected
	StatusCanceled
)

func (s ContractRequestStatus) String() string {
	return [...]string{"Pending", "In Review", "Approved", "Rejected", "Canceled"}[s]
}

func (s ContractRequestStatus) MarshalJSON() ([]byte, error) {
	return json.Marshal(s.String())
}

func (s *ContractRequestStatus) UnmarshalJSON(data []byte) error {
	var statusString string
	if err := json.Unmarshal(data, &statusString); err != nil {
		return err
	}
	switch statusString {
	case "Pending":
		*s = StatusPending
	case "In Review":
		*s = StatusInReview
	case "Approved":
		*s = StatusApproved
	case "Rejected":
		*s = StatusRejected
	case "Canceled":
		*s = StatusCanceled
	default:
		return errors.New("invalid contract request status")
	}
	return nil
}

type ContractRequest struct {
	gorm.Model
	ContractTitle      string                `json:"contract_title"`
	CompanyName        string                `json:"company_name"`
	CompanyAddress     string                `json:"company_address"`
	ClientName         string                `json:"client_name"`
	ClientTitle        string                `json:"client_title"`
	EstimatedValue     float64               `json:"estimated_value"`
	StartDate          time.Time             `json:"start_date"`
	EndDate            time.Time             `json:"end_date"`
	ServiceDescription string                `json:"service_description"`
	FinalDeliverables  string                `json:"final_deliverables"`
	Priority           PriorityLevel         `json:"priority"`
	Status             ContractRequestStatus `json:"contract_request_status"`
	UserID             uint                  `json:"user_id"` // Foreign key for User
	User               User                  `gorm:"foreignKey:UserID" json:"user"`
}
