package server

import (
	"backend/internal/app/routes"
	"backend/internal/config"
	"backend/internal/middleware"

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
    r.Use(middleware.AttachContextMiddleware())

    r.Use(gin.LoggerWithFormatter(middleware.CustomLogFormatter))
    
	r.Use(middleware.RecoveryWithLogger())
    

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
    api := s.engine.Group("/api")
    routes.RegisterProductRoutes(api, s.db)
}

func (s *Server) Run() error {
    return s.engine.Run(":" + s.config.Port)
}
