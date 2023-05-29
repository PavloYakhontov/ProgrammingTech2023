package main

import (
	"fmt"
	"internal/api"
	"internal/env"
	"internal/pg_database"
)

func main() {
	env.Init()
	if err := pg_database.SpawnDb(); err != nil {
		panic(fmt.Sprintf("%s%s", "Database error", err.Error()))
	}
	pg_database.InitTables()
	port := env.ReadEnv("PORT")
	defer func() {
		app := api.NewApp(true)
		if err := app.Run(port); err != nil {
			panic(fmt.Sprintf("%s%s", "Server can not run", err.Error()))
		}
	}()
}
