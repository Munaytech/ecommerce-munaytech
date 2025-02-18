package entity

type ProductBase struct {
	Id_product_base int     `db:"id_product_base" json:"id_product_base"`
	Slug_product    string  `db:"slug_product" json:"slug_product"`
	Title_product   string  `db:"title_product" json:"title_product"`
	Description     string  `db:"description" json:"description"`
	Price_product   float64 `db:"price_product" json:"price_product"`
	Id_category     int     `db:"id_category" json:"id_category"`
}