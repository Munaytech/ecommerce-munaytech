package middleware

import (
	"fmt"
	"runtime/debug"
	"strings"

	"github.com/gin-gonic/gin"
)

func RecoveryWithLogger() gin.HandlerFunc {
    return func(c *gin.Context) {
        defer func() {
            if err := recover(); err != nil {
                stackTrace := string(debug.Stack()) // Captura el stack trace

                // Guarda el error en el contexto para que el logger lo pueda recuperar
				// fmt.Println("Error: ", err)
				// fmt.Println("Stack Trace: ", stackTrace)
                c.Set("error", fmt.Sprintf("%v%s", err, stackTrace))
				// fmt.Println("Context: ", c)

                // Responder con un error genérico
                c.JSON(500, gin.H{
                    "error": "Internal Server Error",
                })

                c.Abort() // Detener la ejecución del request
            }
        }()
        c.Next()
    }
}


func ErrorCaptureMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next() // Procesa la solicitud

        // Captura errores HTTP registrados con c.JSON

		fmt.Println("Errors: ", c.Errors)
        if len(c.Errors) > 0 {
            errorMessages := []string{}
            for _, e := range c.Errors {
                errorMessages = append(errorMessages, e.Err.Error())
            }
            
            // Guarda los errores en el contexto para el logger
            c.Set("error", fmt.Sprintf("message: %s", strings.Join(errorMessages, "; ")))
        }
    }
}


func AttachContextMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Set("context", c) // Almacenar el contexto en `c.Set`
        c.Next()
    }
}
