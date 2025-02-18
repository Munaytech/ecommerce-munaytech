package utils

import (
	"fmt"
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
)

// APIResponse representa el formato estándar de respuesta
type APIResponse struct {
    Status  int         `json:"status"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
}

type ErrorResponse struct {
    Error string `json:"error"`
    Stack string `json:"stack"`
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
        Data:    data,
    })
}

func SuccessStatusOK(c *gin.Context, message string, data interface{}) {
    Success(c, StatusSuccess, message, data)
}

func SuccessStatusCreated(c *gin.Context, message string, data interface{}) {
    Success(c, StatusCreated, message, data)
}

func SuccessStatusNoContent(c *gin.Context, message string) {
    Success(c, StatusNoContent, message, nil)
}

// Error genera una respuesta de error
func Error(c *gin.Context, status int, message string, err error) {
    wrappedErr := errors.WithStack(err) // Envuelve el error con stack trace
    stackTrace := string(debug.Stack()) // Captura el stack trace completo
    c.Set("error", fmt.Sprintf("%v\n%s", message + " | " + wrappedErr.Error(), stackTrace))
    c.JSON(status, gin.H{
        "error":   true,
        "message": message ,
    })
}

func ErrorStatusBadRequest(c *gin.Context, message string, err error) {
    Error(c, StatusBadRequest, message, err)
}

func ErrorStatusUnauthorized(c *gin.Context, message string, err error) {
    Error(c, StatusUnauthorized, message, err)
}

func ErrorStatusForbidden(c *gin.Context, message string, err error) {
    Error(c, StatusForbidden, message, err)
}

func ErrorStatusNotFound(c *gin.Context, message string, err error) {
    Error(c, StatusNotFound, message, err)
}

func ErrorStatusConflict(c *gin.Context, message string, err error) {
    Error(c, StatusConflict, message, err)
}

func ErrorStatusPayloadTooLarge(c *gin.Context, message string, err error) {
    Error(c, StatusPayloadTooLarge, message, err)
}

func ErrorStatusUnsupportedMedia(c *gin.Context, message string, err error) {
    Error(c, StatusUnsupportedMedia, message, err)
}

func ErrorStatusInternalServer(c *gin.Context, message string, err error) {
    Error(c, StatusInternalServer, message, err)
}

// Status codes



const (
    StatusSuccess          = http.StatusOK                  // 200
    StatusCreated          = http.StatusCreated            // 201
    StatusNoContent        = http.StatusNoContent          // 204
    StatusBadRequest       = http.StatusBadRequest         // 400
    StatusUnauthorized     = http.StatusUnauthorized       // 401
    StatusForbidden        = http.StatusForbidden         // 403
    StatusNotFound         = http.StatusNotFound           // 404
    StatusConflict         = http.StatusConflict           // 409
    StatusPayloadTooLarge  = http.StatusRequestEntityTooLarge // 413
    StatusUnsupportedMedia = http.StatusUnsupportedMediaType  // 415
    StatusInternalServer   = http.StatusInternalServerError // 500
)
