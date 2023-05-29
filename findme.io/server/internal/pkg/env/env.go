package env

import (
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func Init() {
	currentWorkDirectory, _ := os.Getwd()
	fmt.Println("FINDME: ", currentWorkDirectory)
	if err := godotenv.Load(fmt.Sprintf("%s%s", currentWorkDirectory, "\\internal\\config\\.env")); err != nil {
		fmt.Println("No .env file found")
	}
}

func ReadEnv(envName string) string {
	return os.Getenv(envName)
}

func WriteEnv(envName, envValue string) error {
	if err := os.Setenv(envName, envValue); err != nil {
		log.Print("WriteEnv.ex", err)
		return err
	}
	return nil
}
