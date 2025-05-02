package server

import (
	"ms-core/internal/app/routes"
	"ms-core/internal/config"
	"ms-core/internal/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Server struct {
    engine *gin.Engine
    config *config.Config
    db     *sqlx.DB
}

func New(cfg *config.Config) *Server {
    r := gin.New()

    r.Use(middleware.CaptureRequestBody()) // <--- ¡Esto va PRIMERO!

    r.Use(cors.New(cors.Config{
        AllowOrigins: []string{"*"}, // Solo permitir solicitudes de este origen
        AllowMethods: []string{"GET", "POST", "PUT", "DELETE"}, // Métodos permitidos
        AllowHeaders: []string{"Origin", "Content-Type", "X-User-ID", "X-User-TOKEN", "Authorization"},
    }))
    
    r.Use(middleware.AttachContextMiddleware())

    r.Use(middleware.RecoveryWithLogger())

    r.Use(gin.LoggerWithFormatter(middleware.CustomLogFormatter))
    
	
    

    // PARA CONECTAR A LA BASE DE DATOS
    db, err := sqlx.Connect("postgres", cfg.DBUrl)
    if err != nil {
        panic(err)
    }
    srv := &Server{engine: r, config: cfg, db: db}

    // srv := &Server{engine: r, config: cfg} // Eliminar esta línea
    srv.routes()
    return srv
}

func (s *Server) routes() {
    api := s.engine.Group(s.config.Prefix)
    routes.RegisterCoreRoutes(api, s.db)
    routes.RegisterProductRoutes(api, s.db)
}

func (s *Server) Run() error {
    return s.engine.Run(":" + s.config.Port)
}
