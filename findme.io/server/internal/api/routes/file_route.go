package routes

import (
	"app/controllers"

	"github.com/gin-gonic/gin"
)

type IFileController interface {
	controllers.IBaseController
	AddPhoto(ctx *gin.Context)
}

func FileRoute(engine *gin.Engine, controller IFileController) {
	router := engine.Group(controller.GetPath())
	{
		router.POST("/add-image", controller.AddPhoto)
	}
}
