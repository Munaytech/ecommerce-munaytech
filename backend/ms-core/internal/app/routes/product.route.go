package routes

import (
	"ms-core/internal/app/handler"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func RegisterProductRoutes(r *gin.RouterGroup, db *sqlx.DB) {
	productHandler := handler.NewProductHandler(db)

	product := r.Group("/product")
	{
		product.GET("/test", productHandler.TestCore)
		product.GET("/productids", productHandler.ProductId)
		product.POST("/productid", productHandler.ProductId)
		product.GET("/categoryall", productHandler.GetCategoryAll)
	}
}
