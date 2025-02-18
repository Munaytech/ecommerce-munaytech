package main

import (
	"backend/internal/config"
	"backend/internal/server"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
    // Cargar el archivo .env
    if err := godotenv.Load(); err != nil {
        log.Println("No se pudo cargar el archivo .env, usando variables de entorno del sistema")
    }

    // Establecer el modo de Gin basado en la variable de entorno GIN_MODE
    ginMode := os.Getenv("GIN_MODE")
    if ginMode == "" {
        ginMode = gin.DebugMode // Por defecto, usar debug si no se encuentra
    }
    gin.SetMode(ginMode)

    cfg := config.LoadConfig()
    
    srv := server.New(cfg)

    log.Printf("Servidor iniciado en el puerto %s en modo %s", cfg.Port, ginMode)
    if err := srv.Run(); err != nil {
        log.Fatalf("Error al iniciar el servidor: %v", err)
    }
}
