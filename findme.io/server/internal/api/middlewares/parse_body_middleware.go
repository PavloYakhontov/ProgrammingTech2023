package middlewares

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io"
	"log"
)

func ParseJSONBodyMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		currType := ctx.GetHeader("Content-Type")
		if currType == "application/json" {
			body := ctx.Request.Body
			parsedBody := make(map[string]any)
			data, readingError := io.ReadAll(body)
			if readingError != nil {
				log.Fatal(readingError)
			}
			if unmarshallingErr := json.Unmarshal(data, &parsedBody); unmarshallingErr != nil {
				log.Fatal(unmarshallingErr)
			}
			ctx.Set("body", parsedBody)
		}
		ctx.Next()
	}
}
