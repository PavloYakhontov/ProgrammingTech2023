package services

import (
	"errors"
	"fmt"
	"internal/env"
	"internal/models"
	"internal/pg_database"
	"pkg/cryptography"
	"pkg/jwts"
	"time"
)

type AuthService struct {
	*BaseService
	DeviceService *UserDeviceService
}

func (auth *AuthService) GetService() any {
	return auth
}

func (auth *AuthService) CheckEmailExists(email string) bool {
	var existedModel models.UserModel
	return pg_database.
		GetDatabaseInstance().
		Instance.
		Table(models.USERS).
		Where("email = ?", email).
		Find(&existedModel).
		RowsAffected > 0
}

func (auth *AuthService) CheckPhoneExists(email string) bool {
	var existedModel models.UserModel
	return pg_database.
		GetDatabaseInstance().
		Instance.
		Table(models.USERS).
		Where("phone = ?", email).
		Find(&existedModel).
		RowsAffected > 0
}

func (auth *AuthService) CreateInitialUser(email, phone, fullName, password, country, city, details string, birthday time.Time) (string, error) {
	serverHash := env.ReadEnv("SERVER_HASH")
	userSalt := fmt.Sprintf("%s:%s:%s:%d", email, fullName, country, birthday.UnixMicro())
	userHash := cryptography.GetSha1(serverHash, userSalt)
	emptyUserModel := models.UserModel{
		UserHash: userHash,
		FullName: fullName,
		Birthday: birthday,
		Details:  details,
		Password: password,
		Email:    email,
		Active:   true,
		City:     city,
		Phone:    phone,
		Country:  country,
		Mood:     "Here to date",
		Gender:   "Male",
	}
	result := pg_database.GetDatabaseInstance().Instance.Table(models.USERS).Create(&emptyUserModel)
	return userHash, result.Error
}

func (auth *AuthService) CreateUserPreferences(userHash string) error {
	emptyUserModel := models.UserPreferenceModel{
		UserHashId:     userHash,
		Theme:          false,
		Lang:           "en-EN",
		Muted:          false,
		EmergencyAlert: false,
		Coords:         "(0,0)",
	}
	result := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PREFERENCES).Create(&emptyUserModel)
	return result.Error
}

func (auth *AuthService) VerifyUserLogin(login, password, deviceId string) (string, error) {
	isForbidden := auth.DeviceService.CheckOrCreateAttempt(deviceId)
	if isForbidden {
		return "", errors.New("attempts for today is already used")
	}
	userBody := map[string]any{}
	if query := pg_database.GetDatabaseInstance().Instance.Table(models.USERS).Where("email = ? OR phone = ?", login, login).Scan(&userBody); query.Error != nil || query.RowsAffected <= 0 {
		return "", errors.New("database query error")
	}
	fmt.Println(userBody)
	hashedPassword := userBody["password"].(string)
	isPasswordValid := cryptography.CheckPasswordHash(password, hashedPassword)
	if !isPasswordValid {
		return "", errors.New("invalid password")
	}
	return userBody["user_hash"].(string), nil
}

const Min30Expiration = 1800000

func (auth *AuthService) GenerateTokens(userHash string) (map[string]any, error) {
	accessToken, err := jwts.CreateToken(userHash, -1, Min30Expiration)
	if err != nil {
		return map[string]any{}, err
	}
	refreshToken, err := jwts.CreateToken(userHash, -1, 0)
	if err != nil {
		return map[string]any{}, err
	}
	return map[string]any{
		"access_token":    accessToken,
		"refresh_token":   refreshToken,
		"expiration_time": time.Now().UnixMilli() + Min30Expiration,
	}, nil
}

func (auth *AuthService) ExchangeToken(refreshToken string) (string, error) {
	userHash, _, _, err := jwts.ValidateToken(refreshToken)
	if err != nil {
		return "", err
	}
	return userHash, nil
}
