package models

type TagsModel struct {
	BaseTypeModel
	UserModel  UserModel `gorm:"foreignKey:UserHashId" json:"user"`
	UserHashId string    `json:"user_hash_id" json:"user_hash_id,omitempty"`
	TagValue   string
}

func (TagsModel) TableName() string {
	return TAGS
}
