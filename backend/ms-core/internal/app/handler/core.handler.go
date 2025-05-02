package handler

import (
	"ms-core/internal/app/entity"
	"ms-core/internal/app/repository"
	"ms-core/internal/app/service"

	"ms-core/utils"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

type CoreHandler struct {
	service *service.CoreService
}

func NewCoreHandler(db *sqlx.DB)  *CoreHandler {
	repo := repository.NewCoreRepository(db)
    svc := service.NewCoreService(repo)
	return &CoreHandler{service: svc}
}


func (h *CoreHandler) TestCore(c *gin.Context) {
	var core entity.ProductEntity
	if err := h.service.TestService(); err != nil {
		utils.ErrorStatusResponse(c, err)
		return
	}
	utils.SuccessStatus(c, utils.StatusCreated, "Registro Exitoso", core)
}
