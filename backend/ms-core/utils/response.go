package utils

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
)

// APIResponse representa el formato estándar de respuesta
type APIResponse struct {
    Status  int         `json:"status"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
    Success bool        `json:"success"`
    Ok     bool        `json:"ok"`
}

type ErrorResponse struct {
    Error error `json:"error"`
    Stack string `json:"stack"`
    Status int `json:"status"`
    Message string `json:"message"`

}

// Success genera una respuesta de éxito
// func Success(c *gin.Context, status int, message string, data interface{}) {
//     c.JSON(status, APIResponse{
//         Status:  status,
//         Message: message,
//         Data:    data,
//     })
// }

func Success(c *gin.Context, status int, message string, data interface{}) {
    c.JSON(status, APIResponse{
        Status:  status,
        Message: message,
        Success: true,
        Ok: true,
        Data:    data,
    })
}
func Error(c *gin.Context, status int, message string, err error) {
    c.Set("error", fmt.Sprintf("%s | %+v", message, err)) // el %+v imprime el stack interno si lo tiene
    c.JSON(status, gin.H{
        "error":   true,
        "message": message,
    })
}

// Error genera una respuesta de error
// func Error(c *gin.Context, status int, message string, err error) {
//     // wrappedErr := errors.WithStack(err) // Envuelve el error con stack trace
//     stackTrace := string(debug.Stack()) // Captura el stack trace completo
//     c.Set("error", fmt.Sprintf("%v\n%s", message + " | " + err.Error(), stackTrace))
//     c.JSON(status, gin.H{
//         "error":   true,
//         "message": message ,
//     })
// }

func WrapError(err error) error {
	if err == nil {
		return nil
	}
	return errors.Wrap(err, "an error occurred")
}

func NewErrorResponse(statusCode int, message string, err error) *ErrorResponse {
    return &ErrorResponse{
        Status:  statusCode,
        Message: message,
        Error:   err,
    }
}

func NewStatusResponse(statusCode int, message string, data interface{})*APIResponse {
    return &APIResponse{
        Status: statusCode,
        Message:    message,
        Data:        data,
    }
}

func ErrorStatusResponse(c *gin.Context, err *ErrorResponse) {
	Error(c, err.Status, err.Message, err.Error)
}

func ErrorStatus(c *gin.Context, statusCode int, message string, err error) {
	Error(c, statusCode, message, err)
}



func SuccessStatus(c *gin.Context, statusCode int, message string, data interface{}) {
    Success(c, statusCode, message, data)
}

const (
    StatusSuccess          = http.StatusOK                   // 200 OK - Petición exitosa
    StatusCreated          = http.StatusCreated              // 201 Created - Recurso creado exitosamente
    StatusNoContent        = http.StatusNoContent            // 204 No Content - Sin contenido para retornar
    StatusBadRequest       = http.StatusBadRequest           // 400 Bad Request - Datos inválidos o sintaxis incorrecta
    StatusUnauthorized     = http.StatusUnauthorized         // 401 Unauthorized - No autenticado o token inválido
    StatusForbidden        = http.StatusForbidden            // 403 Forbidden - No autorizado para acceder
    StatusNotFound         = http.StatusNotFound             // 404 Not Found - Recurso no encontrado
    StatusConflict         = http.StatusConflict             // 409 Conflict - Conflicto con el estado actual del recurso
    StatusPayloadTooLarge  = http.StatusRequestEntityTooLarge // 413 Payload Too Large - Cuerpo de petición muy grande
    StatusUnsupportedMedia = http.StatusUnsupportedMediaType  // 415 Unsupported Media Type - Tipo de contenido no soportado
    StatusInternalServer   = http.StatusInternalServerError   // 500 Internal Server Error - Error inesperado del servidor
)
