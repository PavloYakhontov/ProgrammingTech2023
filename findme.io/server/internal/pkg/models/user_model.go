package models

import (
	"fmt"
	"time"
)

// password, email, fullName, birth, details, gender, avatar
// userhash, active, popularity,

type UserModel struct {
	UserHash   string    `json:"user_hash"`
	FullName   string    `json:"full_name"`
	Birthday   time.Time `json:"birthday"`
	Details    string    `json:"details"`
	Gender     string    `json:"gender"`
	Password   string    `json:"password"`
	Email      string    `json:"email"`
	Mood       string    `json:"mood"`
	Active     bool      `json:"active"`
	Popularity float64   `json:"popularity"`
	City       string    `json:"city"`
	Phone      string    `json:"phone"`
	Country    string    `json:"country"`
}

func CreateUserTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
    id SERIAL PRIMARY KEY,
    user_hash VARCHAR(500) NOT NULL UNIQUE,
    full_name VARCHAR(500) NOT NULL,
    birthday DATE NOT NULL DEFAULT CURRENT_DATE,
    details VARCHAR(500),
    gender VARCHAR(500) DEFAULT 'male',
    password VARCHAR(500) NOT NULL,
    email VARCHAR(500) CHECK (email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
    phone VARCHAR(500) CHECK (LEFT(phone,1) = '+'),
    mood VARCHAR(500) NOT NULL DEFAULT 'Here to date',
    active BOOL DEFAULT true,
    popularity DOUBLE PRECISION DEFAULT 0,
    city VARCHAR(500) NOT NULL,
    country VARCHAR(500) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
)`, USERS)
}

func (UserModel) TableName() string {
	return USERS
}
