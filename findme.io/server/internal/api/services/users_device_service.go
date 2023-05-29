package services

type UserDeviceService struct {
	*BaseService
}

func (device *UserDeviceService) GetService() any {
	return device
}

func (device *UserDeviceService) CheckOrCreateAttempt(deviceId string) bool {
	return false
}
