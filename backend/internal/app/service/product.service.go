package service

import (
	"backend/internal/app/entity"
	"backend/internal/app/repository"
)

type ProductService struct {
    repo *repository.ProductRepository
}

func NewProductService(repo *repository.ProductRepository) *ProductService {
    return &ProductService{repo: repo}
}

func (s *ProductService) GetProducts() ([]entity.ProductBase, error) {
	products, err := s.repo.GetProducts()
	if err != nil {
		return nil, err
	}
	return products, nil
}