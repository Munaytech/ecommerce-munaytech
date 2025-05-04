package handler

import (
	"ms-core/internal/app/entity"
	"ms-core/internal/app/repository"
	"ms-core/internal/app/request"
	"ms-core/internal/app/service"

	"ms-core/utils"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

type ProductHandler struct {
	service *service.ProductService
}

func NewProductHandler(db *sqlx.DB)  *ProductHandler {
	repo := repository.NewProductRepository(db)
    svc := service.NewProductService(repo)
	return &ProductHandler{service: svc}
}


func (h *ProductHandler) TestCore(c *gin.Context) {
	var core entity.CoreEntity
	if err := h.service.TestService(); err != nil {
		utils.ErrorStatusResponse(c, err)
		return
	}
	utils.SuccessStatus(c, utils.StatusCreated, "Registro Exitoso", core)
}

func (h *ProductHandler) ProductId(c *gin.Context) {

	var req request.RequestEntity
	var variant []entity.VariantTypeEntity
	var rating []entity.ProductRatingEntity

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorStatus(c, utils.StatusBadRequest, "Datos inválidos", utils.WrapError(err))
		return
	}
	var Product entity.ProductEntity
	if err := h.service.ProductId(&Product, &variant, &rating, req); err != nil {
		utils.ErrorStatusResponse(c, err)
		return
	}


	var data = map[string]interface{}{}

	data["product"] = Product
	data["variant"] = variant
	data["rating"] = rating
	data["description"] = Product.Description
	data["urlparams"] = Product.Urlparams
	
	utils.SuccessStatus(c, utils.StatusCreated, "Registro Exitoso", data)
}


func (h *ProductHandler) GetCategoryAll(c *gin.Context) {

	
	var Category []entity.CategoryEntity
	if err := h.service.GetCategoryAll(&Category); err != nil {
		utils.ErrorStatusResponse(c, err)
		return
	}

	var data = map[string]interface{}{}

	data["category"] = Category
	
	utils.SuccessStatus(c, utils.StatusSuccess, "", data)
}


func (h *ProductHandler) ProductId2(c *gin.Context) {
	var core entity.CoreEntity
	if err := h.service.TestService(); err != nil {
		utils.ErrorStatusResponse(c, err)
		return
	}
	utils.SuccessStatus(c, utils.StatusCreated, "Registro Exitoso", core)
}



