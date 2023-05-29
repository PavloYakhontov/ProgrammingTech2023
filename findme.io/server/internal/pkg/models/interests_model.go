package models

type Tabler interface {
	TableName() string
}
type InterestsModel struct {
	BaseTypeModel
	UserModel      UserModel `gorm:"foreignKey:UserHashId"`
	UserHashId     string    `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	InterestsLabel string    `json:"interests_label"`
	InterestsValue string    `json:"interests_value"`
}

func (InterestsModel) TableName() string {
	return INTERESTS
}
