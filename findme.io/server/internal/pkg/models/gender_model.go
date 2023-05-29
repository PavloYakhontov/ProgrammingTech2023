package models

import (
	"fmt"
)

type GenderModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func CreateGenderTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
	id SERIAL PRIMARY KEY,
	name VARCHAR(500) NOT NULL UNIQUE
)`, GENDER)
}

func (GenderModel) TableName() string {
	return GENDER
}
