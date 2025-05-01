package routes

import (
	"ms-core/internal/app/handler"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func RegisterCoreRoutes(r *gin.RouterGroup, db *sqlx.DB) {
	coreHandler := handler.NewCoreHandler(db)

	core := r.Group("/core")
	{
		core.GET("/test", coreHandler.TestCore)
	}
}
