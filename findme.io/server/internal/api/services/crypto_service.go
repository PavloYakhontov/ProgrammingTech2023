package services

import (
	"internal/env"
	"pkg/cryptography"
	"strings"
	"time"
)

type CryptoService struct {
	*BaseService
}

func (crypto *CryptoService) GetService() any {
	return crypto
}

func (crypto *CryptoService) GenerateUniqueSha(salt []string) string {
	serverSalt := env.ReadEnv("SERVER_SALT")
	now := time.Now().String()
	joinSalt := strings.Join(salt, "@")
	return cryptography.GetSha1(serverSalt, now+joinSalt)
}
