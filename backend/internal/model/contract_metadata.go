package model

import "time"

// ContractMetadata struct represents metadata associated with a contract.
type ContractMetadata struct {
	ID            uint
	ContractID    uint
	Contract      Contract
	Key           string
	Value         string
	Parties       []string
	effectiveDate time.Time
	ExpiryDate    time.Time
	ContractValue float64
}
