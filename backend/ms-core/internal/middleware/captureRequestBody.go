package middleware

import (
	"bytes"
	"io"
	"strings"

	"github.com/gin-gonic/gin"
)

func CaptureRequestBody() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "POST" || c.Request.Method == "PUT" || c.Request.Method == "PATCH" {
			if strings.HasPrefix(c.GetHeader("Content-Type"), "application/json") {
				bodyBytes, err := io.ReadAll(c.Request.Body)
				if err == nil {
					c.Set("rawBody", bodyBytes)
					// Restaurar body para que lo usen los demás
					c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
				}
			}
		}
		c.Next()
	}
}
