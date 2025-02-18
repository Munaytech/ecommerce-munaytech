package handler

import (
	"backend/internal/app/repository"
	"backend/internal/app/service"
	"backend/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

type ProductHandler struct {
    service *service.ProductService
}

func NewProductHandler(db *sqlx.DB) *ProductHandler {
    repo := repository.NewProductRepository(db)
    svc := service.NewProductService(repo)
    return &ProductHandler{service: svc}
}

func (h *ProductHandler) GetProducts(c *gin.Context) {
    products, err := h.service.GetProducts()
    if err != nil {
        utils.ErrorStatusInternalServer(c, "Error al obtener los productos", err)
        return
    }
    utils.SuccessStatusOK(c, "Productos obtenidos correctamente", products)
}