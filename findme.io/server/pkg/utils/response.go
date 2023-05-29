package utils

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func GiveResponse(statusCode int, statusMessage string) map[string]any {
	return map[string]any{
		"statusCode":    statusCode,
		"statusMessage": statusMessage,
	}
}

func GiveResponseWithData[T comparable](statusCode int, statusMessage string, data T) map[string]any {
	return map[string]any{
		"statusCode":    statusCode,
		"statusMessage": statusMessage,
		"data":          data,
	}
}

func GiveOKResponseWithData[T comparable](data T) map[string]any {
	return map[string]interface{}{
		"statusCode":    http.StatusOK,
		"statusMessage": "Accepted",
		"data":          data,
	}
}

func GiveResponseWithErrors[T comparable](errors T) map[string]any {
	return map[string]interface{}{
		"statusCode":    http.StatusBadRequest,
		"statusMessage": "Data validation error",
		"errors":        errors,
	}
}

func GiveOKResponse() map[string]any {
	return map[string]any{
		"statusCode":    http.StatusOK,
		"statusMessage": "Accepted",
	}
}

func HandleDefaultError(err error, ctx *gin.Context) bool {
	if err != nil {
		log.Print("|HandlerDefaultError| ->", err)
		ctx.JSON(http.StatusBadRequest, GiveResponse(http.StatusConflict, "Bad Request while processing user!"))
		return true
	}
	return false
}


