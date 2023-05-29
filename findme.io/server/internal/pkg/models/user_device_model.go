package models

type UserDeviceModel struct {
	BaseTypeModel
	UserModel  UserModel `gorm:"foreignKey:UserHashId" json:"user_model"`
	UserHashId string    `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	DeviceId   string    `json:"device_id,omitempty"`
	RetryCount int32     `json:"retry_count,omitempty"`
	RetryTime  int32     `json:"retry_time,omitempty"`
}

func (UserDeviceModel) TableName() string {
	return USER_DEVICE
}
