package models

import "time"

type MatchesModel struct {
	BaseTypeModel
	FirstUser       UserModel `gorm:"foreignKey:FirstUserMatch"`
	FirstUserMatch  string    `json:"first_user_match,omitempty"`
	SecondUser      UserModel `gorm:"foreignKey:SecondUserMatch"`
	SecondUserMatch string    `json:"second_user_match,omitempty"`
	Op              string    // LIKE OR DISLIKE
	TimeToLive      time.Time
}

func (MatchesModel) TableName() string {
	return MATCHES
}
