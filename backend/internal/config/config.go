package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
    Port     string
    DBUser   string
    DBPass   string
    DBHost   string
    DBPort   string
    DBName   string
    DBSSL    string
    DBUrl    string
}

func LoadConfig() *Config {
    // Cargar el archivo .env
    if err := godotenv.Load(); err != nil {
        log.Println("No se pudo cargar el archivo .env, usando variables de entorno existentes")
    }

    port := os.Getenv("APP_PORT")
    if port == "" {
        port = "8081"
    }

    dbUser := os.Getenv("DB_USER")
    dbPass := os.Getenv("DB_PASSWORD")
    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")
    dbName := os.Getenv("DB_NAME")
    dbSSL := os.Getenv("DB_SSLMODE")

    if dbUser == "" || dbPass == "" || dbHost == "" || dbPort == "" || dbName == "" {
        log.Fatal("Las variables de entorno de la base de datos no están completamente configuradas")
    }

    dbUrl := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s", dbUser, dbPass, dbHost, dbPort, dbName, dbSSL)

    return &Config{
        Port:  port,
        DBUser: dbUser,
        DBPass: dbPass,
        DBHost: dbHost,
        DBPort: dbPort,
        DBName: dbName,
        DBSSL:  dbSSL,
        DBUrl:  dbUrl,
    }
}
