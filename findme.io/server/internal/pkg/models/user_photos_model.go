package models

type UserPhotosModel struct {
	BaseTypeModel
	UserModel  UserModel `gorm:"foreignKey:UserHashId"`
	UserHashId string    `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	PhotoHash  string    `json:"photo_hash,omitempty"`
	Active     bool      `json:"active,omitempty"`
}

func (UserPhotosModel) TableName() string {
	return USER_PHOTOS
}
