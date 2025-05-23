package entity

type ProductEntity struct {
	Idproduct         *int                `json:"idproduct" db:"id_product"`
	Idproductbase     *int                `json:"idproductbase" db:"id_product_base"`
	Slugproduct       *string             `json:"slugproduct" db:"slug_product"`
	Titleproduct      *string             `json:"titleproduct" db:"title_product"`
	Description       *string             `json:"description" db:"description"`
	Priceproduct      *string             `json:"priceproduct" db:"price_product"`
	Urlparams         *string             `json:"urlparams" db:"url_params"`
	Rating            *float64            `json:"rating" db:"rating"`
	Found             *bool               `json:"found" db:"found"`
	VariantTypeEntity []VariantTypeEntity `json:"varianttype" db:"variant_type"`
}
