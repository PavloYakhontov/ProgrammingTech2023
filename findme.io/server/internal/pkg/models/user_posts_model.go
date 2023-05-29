package models

type UserPostModel struct {
	BaseTypeModel
	UserModel   UserModel `gorm:"foreignKey:UserHashId"`
	UserHashId  string    `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	PhotoHash   string    `json:"photo_hash,omitempty"`
	Description string    `json:"description,omitempty"`
	Active      bool      `json:"active,omitempty"`
}

func (UserPostModel) TableName() string {
	return USER_POSTS
}
