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

func (s *ProductService) ProductId(Product *entity.ProductEntity, Variant *[]entity.VariantTypeEntity, Rating *[]entity.ProductRatingEntity, req request.RequestEntity) *utils.ErrorResponse { return s.Trx(func() *utils.ErrorResponse {
	if err := s.repo.ProductId(Product, req); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	if err := s.repo.ProductIdAll(Product); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	if err := s.repo.ProductIdRating(Rating, *Product.Idproduct); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	var VariantValueEntities []entity.VariantValueEntity
	if err := s.repo.ProductTypeVariants(&VariantValueEntities, *Product.Idproductbase); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

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

	return nil

})}

func (s *ProductService) GetCategoryAll(Category *[]entity.CategoryEntity) *utils.ErrorResponse {
	return s.Trx(func() *utils.ErrorResponse {
		var flat []entity.CategoryEntity

		if err := s.repo.GetCategoryAll(&flat); err != nil {
			return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
		}

		type CategoryNode struct {
			*entity.CategoryEntity
			Children []*CategoryNode `json:"children,omitempty"`
		}

		// Mapa temporal por ID
		nodeMap := make(map[int]*CategoryNode)

		for i := range flat {
			if flat[i].Idcategory != nil {
				nodeMap[*flat[i].Idcategory] = &CategoryNode{CategoryEntity: &flat[i]}
			}
		}

		var roots []*CategoryNode

		// Construcción jerárquica
		for _, node := range nodeMap {
			if node.Parentidcategory == nil {
				roots = append(roots, node)
			} else if parentNode, ok := nodeMap[*node.Parentidcategory]; ok {
				parentNode.Children = append(parentNode.Children, node)
			}
		}

		// Convertir recursivamente a []entity.CategoryEntity con hijos
		var convert func(*CategoryNode) entity.CategoryEntity
		convert = func(n *CategoryNode) entity.CategoryEntity {
			result := *n.CategoryEntity
			for _, child := range n.Children {
				childEntity := convert(child)
				result.Children = append(result.Children, &childEntity)
			}
			return result
		}

		var finalResult []entity.CategoryEntity
		for _, r := range roots {
			finalResult = append(finalResult, convert(r))
		}

		*Category = finalResult
		return nil
	})
}



func (s *ProductService) TestService() *utils.ErrorResponse { return s.Trx(func() *utils.ErrorResponse {
	var valores []int
	if err := s.repo.TestRepository(&valores); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	return nil

})}

