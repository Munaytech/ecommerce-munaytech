package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"ms-core/internal/app/entity"
	"ms-core/internal/app/request"
	"ms-core/utils"
	"strings"

	"github.com/jmoiron/sqlx"
)

type ProductRepository struct {
	Db *sqlx.DB
	Tx *sqlx.Tx
}

func NewProductRepository(db *sqlx.DB) *ProductRepository {
	return &ProductRepository{Db: db}
}

func (r *ProductRepository) TestRepository(rows *[]int) error {
	err := r.Tx.Select(rows, `SELECT 1`)

	return utils.WrapError(IgnoreNoRows(err))
	// return utils.WrapError(err)
}

func (r *ProductRepository) ProductId(Product *entity.ProductEntity, req request.RequestEntity) error {

	whereClauses := []string{}
	args := []interface{}{}
	var err error

	query := `
		SELECT p.id_product
		FROM munay_ecommerce.product_base pb
		JOIN munay_ecommerce.product p ON pb.id_product_base = p.id_product
		JOIN munay_ecommerce.product_variant pv ON pv.id_product = p.id_product
		JOIN munay_ecommerce.variant_value vv ON vv.id_variant_value = pv.id_variant_value
		JOIN munay_ecommerce.variant_type vt ON vt.id_variant_type = vv.id_variant_type
	`

	whereClauses = append(whereClauses, fmt.Sprintf("pb.slug_product = $%d", 1)) 
	args = append(args, req.Slug)
	for i, variant := range req.Variant {
		if variant.Name == "" || variant.Value == "" {
			continue // Skip empty variants
		}
		whereClauses = append(whereClauses, fmt.Sprintf("vt.name = $%d", i+2))
		args = append(args, variant.Name)
		whereClauses = append(whereClauses, fmt.Sprintf("vv.value = $%d", i+3))
		args = append(args, variant.Value)
	}

	if len(whereClauses) < 2 {
		err = r.Tx.Get(Product, query+` WHERE TRUE AND ` + strings.Join(whereClauses, " AND ") + ` LIMIT 1` , args...)
		// err = r.IgnoreNoRows(err)
		return utils.WrapError(err)
	}

	err = r.Tx.Get(Product, query+` WHERE TRUE AND ` + strings.Join(whereClauses, " AND "), args...)

	if( err != nil) {
		err = r.Tx.Get(Product, query+` WHERE TRUE AND ` + whereClauses[0] + ` LIMIT 1` , args[0])
		// err = r.IgnoreNoRows(err)
		return utils.WrapError(err)
	}

	// err = r.IgnoreNoRows(err)
	
	return utils.WrapError(err)
}


func (r *ProductRepository) ProductIdAll(Product *entity.ProductEntity) error {
	query := `
		SELECT p.id_product, pb.id_product_base, pb.title_product, pb.description, p.price_product
		FROM munay_ecommerce.product_base pb
		JOIN munay_ecommerce.product p ON pb.id_product_base = p.id_product
		JOIN munay_ecommerce.product_variant pv ON pv.id_product = p.id_product
		JOIN munay_ecommerce.variant_value vv ON vv.id_variant_value = pv.id_variant_value
		JOIN munay_ecommerce.variant_type vt ON vt.id_variant_type = vv.id_variant_type
		WHERE TRUE AND p.id_product = $1
	`
	var err error
	err = r.Tx.Get(Product, query, Product.Idproduct)
	return utils.WrapError(err)
}

func (r *ProductRepository) ProductTypeVariants(Variant *[]entity.VariantValueEntity, id int) error {
	query := `
		SELECT DISTINCT vv.id_variant_value, vv.id_variant_type, vt.name, vv.value
		FROM munay_ecommerce.product_base pb
		JOIN munay_ecommerce.product p ON pb.id_product_base = p.id_product
		JOIN munay_ecommerce.product_variant pv ON pv.id_product = p.id_product
		JOIN munay_ecommerce.variant_value vv ON vv.id_variant_value = pv.id_variant_value
		JOIN munay_ecommerce.variant_type vt ON vt.id_variant_type = vv.id_variant_type
		WHERE pb.id_product_base = $1
	`
	var err error
	err = r.Tx.Select(Variant, query, id)
	return utils.WrapError(err)
}



func (r *ProductRepository) IgnoreNoRows(err error) error {
	if err == nil || errors.Is(err, sql.ErrNoRows) {
		return nil
	}
	return err
}

func (r *ProductRepository) BeginTransaction() error {
	tx, err := r.Db.Beginx()
	if err != nil {
		return err
	}
	r.Tx = tx
	return nil
}

func (r *ProductRepository) CommitTransaction() error {
	if r.Tx == nil {
		return errors.New("no hay transacción activa")
	}
	err := r.Tx.Commit()
	r.Tx = nil // Siempre liberar la transacción
	return err
}

func (r *ProductRepository) RollbackTransaction() error {
	if r.Tx == nil {
		// Si no hay transacción activa, simplemente no hay rollback que hacer
		return nil
	}
	err := r.Tx.Rollback()
	r.Tx = nil // Siempre liberar aunque falle el rollback
	if err != nil && err != sql.ErrTxDone {
		return fmt.Errorf("error al hacer rollback: %w", err)
	}
	return nil
}
