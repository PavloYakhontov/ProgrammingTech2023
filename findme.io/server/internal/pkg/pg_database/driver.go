package pg_database

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"internal/env"
)

// postgres://pg:pass@localhost:5432/crud
type postgresInstance struct {
	Instance *gorm.DB
	cfg      struct {
		host     string
		pass     string
		username string
		dbname   string
		port     string
	}
}

func SpawnDb() error {
	apt := postgresInstance{
		cfg: struct {
			host     string
			pass     string
			username string
			dbname   string
			port     string
		}{
			host:     env.ReadEnv("POSTGRES_HOST"),
			pass:     env.ReadEnv("POSTGRES_PASSWORD"),
			username: env.ReadEnv("POSTGRES_USER"),
			dbname:   env.ReadEnv("DB_NAME"),
			port:     env.ReadEnv("POSTGRES_PORT"),
		},
	}
	c := apt.cfg
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", c.username, c.pass, c.host, c.port, c.dbname)
	fmt.Println(c.username, c.pass, c.host, c.port, c.dbname)
	apt.Instance, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if apt.Instance.Error != nil {
		fmt.Println("something went wrong with db")
		return apt.Instance.Error
	}
	instance = &apt
	return nil
}

var instance *postgresInstance

func GetDatabaseInstance() *postgresInstance {
	if instance == nil {
		if err := SpawnDb(); err != nil {
			panic(err)
		}
	}
	return instance
}
