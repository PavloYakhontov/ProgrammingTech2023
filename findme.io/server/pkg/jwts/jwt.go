package jwts

import (
	"errors"
	"github.com/dgrijalva/jwt-go/v4"
	"internal/env"
	"strconv"
	"strings"
	"time"
)

// userHash string
//id string

type UserClaim struct {
	jwt.StandardClaims
	UserHash string `json:"user_hash,omitempty"`
	Id       int    `json:"id,omitempty"`
}

func CreateToken(userHash string, id int, expirationTime int) (string, error) {
	serverKey := env.ReadEnv("SERVER_HASH")
	claims := UserClaim{
		StandardClaims: jwt.StandardClaims{
			IssuedAt: jwt.At(time.Now()),
			Subject:  "user claim token",
		},
		UserHash: userHash,
		Id:       id,
	}
	if expirationTime != 0 {
		claims.StandardClaims.ExpiresAt = jwt.At(time.Now().Add(time.Duration(expirationTime)))
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &claims)
	return token.SignedString([]byte(serverKey))
}

func ValidateToken(token string) (string, string, int, error) {
	serverKey := env.ReadEnv("SERVER_HASH")
	parsedToken, err := jwt.ParseWithClaims(token, &UserClaim{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(serverKey), nil
	})
	if err != nil {
		return "", "", 0, err
	}
	if claims, ok := parsedToken.Claims.(*UserClaim); ok && parsedToken.Valid {
		if claims.ExpiresAt == nil {
			return claims.UserHash, strconv.Itoa(claims.Id), 0, nil
		}
		return claims.UserHash, strconv.Itoa(claims.Id), claims.ExpiresAt.Second(), nil
	}
	return "", "", 0, &jwt.TokenExpiredError{}
}

func IsTokenExpired(token string) bool {
	serverKey := env.ReadEnv("SERVER_HASH")
	_, err := jwt.ParseWithClaims(token, &UserClaim{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(serverKey), nil
	})
	if err == nil {
		return false
	}
	return strings.Contains(err.Error(), "token is expired")
}
