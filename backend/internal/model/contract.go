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
