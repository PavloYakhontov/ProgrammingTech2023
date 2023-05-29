package models

type NotificationsModel struct {
	BaseTypeModel     `json:"base_type_model"`
	UserModel         UserModel `gorm:"foreignKey:UserHashId"`
	UserHashId        string    `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	NotificationText  string    `json:"notification_text,omitempty"`
	NotificationLabel string    `json:"notification_label,omitempty"`
	Importance        int8      `json:"importance,omitempty"`
}

func (NotificationsModel) TableName() string {
	return NOTIFICATIONS
}
