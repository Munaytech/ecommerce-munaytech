package middleware

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/gin-gonic/gin"
)

// CustomLogFormatter formatea los logs de Gin al estilo Java
func CustomLogFormatter(param gin.LogFormatterParams) string {
    params := make(map[string]interface{})

    if param.Request.Method == "POST" || param.Request.Method == "PUT" || param.Request.Method == "PATCH" {
        contentType := param.Request.Header.Get("Content-Type")

        if contentType == "application/json" {
            bodyBytes, err := ioutil.ReadAll(param.Request.Body)
            if err == nil {
                var jsonBody map[string]interface{}
                if json.Unmarshal(bodyBytes, &jsonBody) == nil {
                    params["body"] = jsonBody
                }
            }
            param.Request.Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))
        } else if strings.HasPrefix(contentType, "multipart/form-data") {
            err := param.Request.ParseMultipartForm(32 << 20) // 32MB límite
            if err == nil && param.Request.MultipartForm != nil {
                files := []map[string]string{}
                for key, fileHeaders := range param.Request.MultipartForm.File {
                    for _, fileHeader := range fileHeaders {
                        files = append(files, map[string]string{"key": key, "filename": fileHeader.Filename})
                    }
                }
                if len(files) > 0 {
                    params["files"] = files
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

    // Determinar color según el código de estado
    statusColor := green
    if param.StatusCode >= 300 && param.StatusCode < 400 {
        statusColor = yellow
    } else if param.StatusCode >= 400 {
        statusColor = red
    }

    var errorStack string
    if ctxRaw, exists := param.Keys["context"]; exists {
        if ctx, ok := ctxRaw.(*gin.Context); ok {
            if errVal, exists := ctx.Get("error"); exists {
                errorStack = errVal.(string) // Recuperamos el error almacenado en `c.Set("error", ...)`
            }
        }
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
