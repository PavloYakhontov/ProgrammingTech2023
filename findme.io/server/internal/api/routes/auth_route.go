package routes

import (
	"app/controllers"
	"github.com/gin-gonic/gin"
)

type IAuthController interface {
	controllers.IBaseController
	Login(ctx *gin.Context)
	Register(ctx *gin.Context)
	VerifyCode(ctx *gin.Context)
	HasEmailOrPhone(ctx *gin.Context)
	Delete(ctx *gin.Context)
	UpdateToken(ctx *gin.Context)
}

func AuthRoute(engine *gin.Engine, controller IAuthController) {
	router := engine.Group(controller.GetPath())
	{
		// http://localhost:8080/auth/login
		router.POST("/login", controller.Login)
		router.POST("/register", controller.Register)
		router.POST("/checkEmailOrPhone", controller.HasEmailOrPhone)
		router.POST("/verifyCode", controller.VerifyCode)
		router.DELETE("/delete", controller.Delete)
		router.POST("/refresh", controller.UpdateToken)
	}
}
