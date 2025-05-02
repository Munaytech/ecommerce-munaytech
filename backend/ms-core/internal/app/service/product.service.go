package service

import (
	"ms-core/internal/app/entity"
	"ms-core/internal/app/repository"
	"ms-core/internal/app/request"
	"ms-core/utils"
)

type ProductService struct {
	repo *repository.ProductRepository
}


func NewProductService(repo *repository.ProductRepository) *ProductService {
	return &ProductService{repo: repo}
}

func (s *ProductService) Trx(fn func() *utils.ErrorResponse) *utils.ErrorResponse {
	if err := s.repo.BeginTransaction(); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error al iniciar transacción", err)
	}

	rollback := true
	defer func() {
		if rollback {
			_ = s.repo.RollbackTransaction()
		}
	}()

	errResp := fn()
	if errResp != nil {
		return errResp
	}

	if err := s.repo.CommitTransaction(); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error al confirmar transacción", err)
	}

	rollback = false
	return nil
}

func (s *ProductService) ProductId(Product *entity.ProductEntity, Variant *[]entity.VariantTypeEntity, req request.RequestEntity) *utils.ErrorResponse { return s.Trx(func() *utils.ErrorResponse {
	if err := s.repo.ProductId(Product, req); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	if err := s.repo.ProductIdAll(Product); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}
	var VariantValueEntities []entity.VariantValueEntity
	if err := s.repo.ProductTypeVariants(&VariantValueEntities, *Product.Idproductbase); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	utils.PrintJSON(VariantValueEntities)

	evalsMap := make(map[int]*entity.VariantTypeEntity)
	for _, row := range VariantValueEntities {
		eval, exists := evalsMap[*row.Idvarianttype]
		if !exists {
			eval = &entity.VariantTypeEntity{
				Idvarianttype:        row.Idvarianttype,
				Name:     row.Name,
				Variantvalue: []entity.VariantValueEntity{},
			}
			evalsMap[*row.Idvarianttype] = eval
		}

		var pregunta *entity.VariantValueEntity
		for i := range eval.Variantvalue {
			if eval.Variantvalue[i].Name == row.Name {
				pregunta = &eval.Variantvalue[i]
				break
			}
		}
		if pregunta == nil {
			eval.Variantvalue = append(eval.Variantvalue, entity.VariantValueEntity{
				Idvariantvalue:    row.Idvariantvalue,
				Value:   row.Value,
			})
			// pregunta = &eval.Variantvalue[len(eval.Variantvalue)-1]
		}
	}

	for _, eval := range evalsMap {
		*Variant = append(*Variant, *eval)
	}


	utils.PrintJSON(Product)

	return nil

})}

func (s *ProductService) TestService() *utils.ErrorResponse { return s.Trx(func() *utils.ErrorResponse {
	var valores []int
	if err := s.repo.TestRepository(&valores); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	return nil

})}

