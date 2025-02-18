package repository

import (
	"backend/internal/app/entity"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type ProductRepository struct {
    db *sqlx.DB
}

func NewProductRepository(db *sqlx.DB) *ProductRepository {
    return &ProductRepository{db: db}
}

func (r *ProductRepository) GetProducts() ([] entity.ProductBase, error) {
	var products []entity.ProductBase
	err := r.db.Select(&products, "SELECT * FROM munay_ecommerce.product_base")
	fmt.Println(products)
	fmt.Println(err)
	if err != nil {
		return nil, err
	}
	return products, nil
}
