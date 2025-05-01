package middleware

import (
	"encoding/json"
	"fmt"

	"github.com/gin-gonic/gin"
)

// CustomLogFormatter formatea los logs de Gin al estilo Java y muestra el cuerpo del request
func CustomLogFormatter(param gin.LogFormatterParams) string {
	params := make(map[string]interface{})

	var errorStack string

	// Usamos el contexto capturado para acceder al rawBody y errores
	if ctxRaw, exists := param.Keys["context"]; exists {
		if ctx, ok := ctxRaw.(*gin.Context); ok {

			// Capturar el cuerpo raw si está disponible
			if rawBody, exists := ctx.Get("rawBody"); exists {
				bodyBytes, ok := rawBody.([]byte)
				if ok && len(bodyBytes) > 0 {
					var jsonBody map[string]interface{}
					if err := json.Unmarshal(bodyBytes, &jsonBody); err == nil {
						params["body"] = jsonBody
					} else {
						params["body"] = string(bodyBytes) // fallback como texto plano
					}
				}
			}

			// Capturar el stack de error si existe
			if errVal, exists := ctx.Get("error"); exists {
				if errStr, ok := errVal.(string); ok {
					errorStack = errStr
				}
			}
		}
	}

	paramsJSON, _ := json.Marshal(params)

	// Colores ANSI
	green := "\033[32m"
	yellow := "\033[33m"
	red := "\033[31m"
	blue := "\033[34m"
	reset := "\033[0m"

	statusColor := green
	if param.StatusCode >= 300 && param.StatusCode < 400 {
		statusColor = yellow
	} else if param.StatusCode >= 400 {
		statusColor = red
	}

	return fmt.Sprintf("INFO [%s] | %s%3d%s | %13v | %15s | %s%-7s%s %s | params: %s%s\n",
		param.TimeStamp.Format("2006-01-02 15:04:05"),
		statusColor, param.StatusCode, reset,
		param.Latency,
		param.ClientIP,
		blue, param.Method, reset,
		param.Path,
		paramsJSON,
		func() string {
			if errorStack != "" {
				return fmt.Sprintf("\nDEBUG: %s", errorStack)
			}
			return ""
		}(),
	)
}
