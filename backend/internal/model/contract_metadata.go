package model

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type ContractMetadata struct {
	gorm.Model
	ContractID    uint           `json:"contract_id"` // Foreign key for Contract
	Contract      Contract       `gorm:"foreignKey:ContractID" json:"contract"`
	Parties       pq.StringArray `json:"parties" gorm:"type:text[]"`
	EffectiveDate time.Time      `json:"effective_date"`
	ExpiryDate    time.Time      `json:"expiry_date"`
	ContractValue float64        `json:"contract_value"`
}
