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
	var err error

	mainQuery  := `
		SELECT sub.id_product
		FROM (
			SELECT p.id_product, pb.slug_product, ARRAY_AGG(vv.id_variant_value ORDER BY vv.id_variant_value) AS variant_ids
			FROM munay_ecommerce.product_base pb
			JOIN munay_ecommerce.product p ON pb.id_product_base = p.id_product_base
			JOIN munay_ecommerce.product_variant pv ON pv.id_product = p.id_product
			JOIN munay_ecommerce.variant_value vv ON vv.id_variant_value = pv.id_variant_value
			JOIN munay_ecommerce.variant_type vt ON vt.id_variant_type = vv.id_variant_type
			WHERE pb.slug_product = $1
			GROUP BY p.id_product, pb.slug_product
		) sub
		WHERE sub.variant_ids = (
			SELECT ARRAY_AGG(vv.id_variant_value ORDER BY vv.id_variant_value)
			FROM munay_ecommerce.variant_value vv
			JOIN munay_ecommerce.variant_type vt ON vt.id_variant_type = vv.id_variant_type
			WHERE (vt.name, vv.value) IN ( %s )
		);`

	fallbackQuery := `
	SELECT p.id_product
	FROM munay_ecommerce.product_base pb
	JOIN munay_ecommerce.product p ON pb.id_product_base = p.id_product_base
	WHERE pb.slug_product = $1
	ORDER BY p.id_product
	LIMIT 1;`

	valueArgs := []interface{}{req.Slug} // $1
	inClauses := make([]string, len(req.Variant))

	for i, v := range req.Variant {
		if v.Name == "" || v.Value == "" {
			continue
		}
		inClauses[i] = fmt.Sprintf("($%d, $%d)", 2+i*2, 3+i*2)
		valueArgs = append(valueArgs, v.Name, v.Value)
	}

	if len(inClauses) < 2 {
		err = r.Tx.Get(Product, fallbackQuery, req.Slug)
		return  utils.WrapError(err)
	}

	// Reemplazar %s por la lista de placeholders generada
	finalQuery := fmt.Sprintf(mainQuery , strings.Join(inClauses, ", "))
	err = r.Tx.Get(Product, finalQuery , valueArgs...)
	if err != sql.ErrNoRows {
		return utils.WrapError(err)
	}

	if( err != nil) {
		err = r.Tx.Get(Product, fallbackQuery, req.Slug)
		return  utils.WrapError(err)
	}

	return utils.WrapError(err)

}


func (r *ProductRepository) ProductIdAll(Product *entity.ProductEntity) error {
	query := `
		SELECT p.id_product, pb.id_product_base, pb.title_product, pb.description, p.price_product, p.description
		, (
			SELECT  string_agg(name || '=' || value, '&') AS url_params
			FROM munay_ecommerce.product_base pb
			JOIN munay_ecommerce.product px ON pb.id_product_base = px.id_product_base
			JOIN munay_ecommerce.product_variant pv ON pv.id_product = px.id_product
			JOIN munay_ecommerce.variant_value vv ON vv.id_variant_value = pv.id_variant_value
			JOIN munay_ecommerce.variant_type vt ON vt.id_variant_type = vv.id_variant_type
			where px.id_product = p.id_product
			group by pb.slug_product
			order by pb.slug_product, string_agg(name || '=' || value, '&')
		) as url_params
		, COALESCE((
			SELECT  SUM(pr.rating)::numeric / count(*) AS rating
			FROM munay_ecommerce.product_rating pr
			where pr.id_product = p.id_product
		), 0) as rating
		FROM munay_ecommerce.product_base pb
		JOIN munay_ecommerce.product p ON pb.id_product_base = p.id_product_base
		WHERE TRUE AND p.id_product = $1
	`
	err := r.Tx.Get(Product, query, Product.Idproduct)
	return utils.WrapError(err)
}


func (r *ProductRepository) ProductIdRating(ProductRating *[]entity.ProductRatingEntity, id int) error {
	query := `
		SELECT pr.id_product, pr.rating, pr.review_text, pr.rated_at,
		       u.id_user, u.full_name, u.user_image_text
		FROM munay_ecommerce.product_rating pr
		JOIN munay_ecommerce.user u ON u.id_user = pr.id_user
		WHERE pr.id_product = $1
		ORDER BY pr.rated_at DESC
	`
	err := r.Tx.Select(ProductRating, query, id)
	return utils.WrapError(err)
}


func (r *ProductRepository) ProductTypeVariants(Variant *[]entity.VariantValueEntity, id int) error {
	query := `
		SELECT DISTINCT vv.id_variant_value, vt.id_variant_type, vt.name, vv.value
		FROM munay_ecommerce.product_base pb
		JOIN munay_ecommerce.product p ON pb.id_product_base = p.id_product_base
		JOIN munay_ecommerce.product_variant pv ON pv.id_product = p.id_product
		JOIN munay_ecommerce.variant_value vv ON vv.id_variant_value = pv.id_variant_value
		JOIN munay_ecommerce.variant_type vt ON vt.id_variant_type = vv.id_variant_type
		WHERE pb.id_product_base = $1
		ORDER BY vt.id_variant_type, vv.id_variant_value
	`
	err := r.Tx.Select(Variant, query, id)
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
