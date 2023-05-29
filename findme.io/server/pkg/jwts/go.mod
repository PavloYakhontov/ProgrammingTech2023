module jwts

go 1.20

replace internal/env => ./../../internal/pkg/env

require (
	github.com/dgrijalva/jwt-go/v4 v4.0.0-preview1
	internal/env v0.0.0-00010101000000-000000000000
)

require github.com/joho/godotenv v1.5.1 // indirect
