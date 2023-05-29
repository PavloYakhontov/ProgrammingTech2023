package services

type UserService struct {
	*BaseService
}

func (user *UserService) GetUsers() []int {
	return []int{1, 2, 3, 4}
}

func UserServiceInstance() *UserService {
	return &UserService{
		&BaseService{
			tableName: "users",
		},
	}
}
