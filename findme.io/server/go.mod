module findme.io

go 1.20

require (
	internal/api v0.0.0-00010101000000-000000000000
	internal/env v0.0.0-00010101000000-000000000000
	internal/pg_database v0.0.0-00010101000000-000000000000
)

require (
	app/controllers v0.0.0-00010101000000-000000000000 // indirect
	app/dtos v0.0.0-00010101000000-000000000000 // indirect
	app/middlewares v0.0.0-00010101000000-000000000000 // indirect
	app/routes v0.0.0-00010101000000-000000000000 // indirect
	app/services v0.0.0-00010101000000-000000000000 // indirect
	cloud.google.com/go v0.110.0 // indirect
	cloud.google.com/go/compute v1.19.0 // indirect
	cloud.google.com/go/compute/metadata v0.2.3 // indirect
	cloud.google.com/go/firestore v1.9.0 // indirect
	cloud.google.com/go/iam v0.13.0 // indirect
	cloud.google.com/go/longrunning v0.4.1 // indirect
	cloud.google.com/go/storage v1.28.1 // indirect
	firebase.google.com/go v3.13.0+incompatible // indirect
	github.com/bytedance/sonic v1.8.5 // indirect
	github.com/chenzhuoyu/base64x v0.0.0-20221115062448-fe3a3abad311 // indirect
	github.com/dgrijalva/jwt-go/v4 v4.0.0-preview1 // indirect
	github.com/gin-contrib/sse v0.1.0 // indirect
	github.com/gin-gonic/gin v1.9.0 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.11.2 // indirect
	github.com/goccy/go-json v0.10.1 // indirect
	github.com/golang/groupcache v0.0.0-20200121045136-8c9f03a8e57e // indirect
	github.com/golang/protobuf v1.5.3 // indirect
	github.com/google/go-cmp v0.5.9 // indirect
	github.com/google/s2a-go v0.1.3 // indirect
	github.com/google/uuid v1.3.0 // indirect
	github.com/googleapis/enterprise-certificate-proxy v0.2.3 // indirect
	github.com/googleapis/gax-go/v2 v2.8.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a // indirect
	github.com/jackc/pgx/v5 v5.3.1 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/joho/godotenv v1.5.1 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/klauspost/cpuid/v2 v2.2.4 // indirect
	github.com/leodido/go-urn v1.2.2 // indirect
	github.com/mattn/go-isatty v0.0.17 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/pelletier/go-toml/v2 v2.0.7 // indirect
	github.com/twitchyliquid64/golang-asm v0.15.1 // indirect
	github.com/ugorji/go/codec v1.2.11 // indirect
	go.opencensus.io v0.24.0 // indirect
	golang.org/x/arch v0.3.0 // indirect
	golang.org/x/crypto v0.9.0 // indirect
	golang.org/x/net v0.10.0 // indirect
	golang.org/x/oauth2 v0.8.0 // indirect
	golang.org/x/sync v0.1.0 // indirect
	golang.org/x/sys v0.8.0 // indirect
	golang.org/x/text v0.9.0 // indirect
	golang.org/x/time v0.1.0 // indirect
	golang.org/x/xerrors v0.0.0-20220907171357-04be3eba64a2 // indirect
	google.golang.org/api v0.122.0 // indirect
	google.golang.org/appengine v1.6.7 // indirect
	google.golang.org/genproto v0.0.0-20230410155749-daa745c078e1 // indirect
	google.golang.org/grpc v1.54.0 // indirect
	google.golang.org/protobuf v1.30.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
	gorm.io/driver/postgres v1.5.0 // indirect
	gorm.io/gorm v1.24.7-0.20230306060331-85eaf9eeda11 // indirect
	internal/models v0.0.0-00010101000000-000000000000 // indirect
	pkg/cryptography v0.0.0-00010101000000-000000000000 // indirect
	pkg/dto v0.0.0-00010101000000-000000000000 // indirect
	pkg/fsystem v0.0.0-00010101000000-000000000000 // indirect
	pkg/jwts v0.0.0-00010101000000-000000000000 // indirect
	pkg/utils v0.0.0-00010101000000-000000000000 // indirect
)

replace internal/pg_database => ./internal/pkg/pg_database

replace internal/env => ./internal/pkg/env

replace internal/api => ./internal/api

replace internal/models => ./internal/pkg/models

replace app/controllers => ./internal/api/controllers

replace app/routes => ./internal/api/routes

replace app/services => ./internal/api/services

replace app/dtos => ./internal/api/dtos

replace app/middlewares => ./internal/api/middlewares

replace pkg/jwts => ./pkg/jwts

replace pkg/utils => ./pkg/utils

replace pkg/dto => ./pkg/dto

replace pkg/cryptography => ./pkg/cryptography

replace pkg/fsystem => ./pkg/fsystem
