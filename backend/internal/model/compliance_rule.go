package model

import "gorm.io/gorm"

type ComplianceRule struct {
	gorm.Model
	Title     string `json:"title"`
	Condition string `json:"condition"`
}
