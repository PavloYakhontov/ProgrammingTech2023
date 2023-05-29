package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func TestingRoute(engine *gin.Engine) {
	router := engine.Group("/test")
	{
		router.GET("/panic", func(context *gin.Context) {
			context.JSON(http.StatusInternalServerError, map[string]string{
				"zxc": "asd",
			})
		})
	}
}
