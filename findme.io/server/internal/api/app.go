package api

import (
	"app/controllers"
	"app/middlewares"
	"app/routes"
	"fmt"
	"internal/pg_database"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gin-gonic/gin"
)

const API_BASE string = "/api/v2"

type FindMeIoApplication struct {
	Ver      string
	Instance *gin.Engine
}

func NewApp(withLogger bool) *FindMeIoApplication {
	inst := &FindMeIoApplication{
		Ver:      "0.0.1",
		Instance: gin.Default(),
	}
	inst.Instance.Use(
		gin.Recovery(),
		gin.Logger(),
	)

	if !withLogger {
		inst.Instance = gin.New()
	}
	return inst
}

func (app *FindMeIoApplication) getControllers() (*controllers.FileController,
	*controllers.UserController,
	*controllers.AuthController) {
	user := controllers.CreateUserController(API_BASE)
	auth := controllers.CreateAuthController(API_BASE)
	file := controllers.CreateFileController(API_BASE)
	return file, user, auth
}

func (app *FindMeIoApplication) RunDatabaseBackgroundTasks() {}

func (app *FindMeIoApplication) Run(port string) error {
	file, user, auth := app.getControllers()

	app.Instance.Use(middlewares.ParseJSONBodyMiddleware())
	routes.AuthRoute(app.Instance, auth)
	routes.TestingRoute(app.Instance)

	app.Instance.Use(middlewares.AuthMiddleware())
	routes.UserRouter(app.Instance, user)
	routes.FileRoute(app.Instance, file)

	httpServer := &http.Server{
		Addr:           port,
		Handler:        app.Instance,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	go app.RunDatabaseBackgroundTasks()

	go func() {
		if err := httpServer.ListenAndServe(); err != nil {
			log.Fatalf("Failed to listen and serve: %+v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, os.Interrupt)
	v := <-quit
	fmt.Println(v.String())
	fmt.Println("Server closing...")

	pg, _ := pg_database.GetDatabaseInstance().Instance.DB()
	defer func() {
		if err := pg.Close(); err != nil {
			log.Fatalf("Error while trying to close database connection %s", err.Error())
		}
	}()
	return nil
}
