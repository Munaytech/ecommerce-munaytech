package routes

import (
	productHandler "backend/internal/app/handler"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func RegisterProductRoutes(r *gin.RouterGroup, db *sqlx.DB) {
    productRoutes := productHandler.NewProductHandler(db)

    product := r.Group("/PRODUCT")
    {
        product.GET("/", productRoutes.GetProducts)

    }
}