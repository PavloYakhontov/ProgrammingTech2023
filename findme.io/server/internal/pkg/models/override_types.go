package models

import (
	"time"

	"gorm.io/gorm"
)

type BaseTypeModel struct {
	ID        uint           `gorm:"primarykey" json:"id,omitempty"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}

const (
	INTERESTS        = "interests"
	MATCHES          = "matches"
	GENDER           = "gender"
	MOOD             = "mood"
	NOTIFICATIONS    = "notifications"
	TAGS             = "tags"
	USERS            = "users"
	USER_DEVICE      = "user_devices"
	USER_POSTS       = "user_posts"
	USER_PREFERENCES = "user_preferences"
	USER_PHOTOS      = "user_photos"
)
