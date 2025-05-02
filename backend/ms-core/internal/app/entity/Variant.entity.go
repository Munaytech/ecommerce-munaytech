package entity

type VariantTypeEntity struct {
	Idvarianttype *int                 `json:"idvariantvalue" db:"id_variant_type"`
	Name          *string              `json:"name" db:"name"`
	Variantvalue  []VariantValueEntity `json:"variantvalue" db:"variant_value"`
}

type VariantValueEntity struct {
	Idvariantvalue *int    `json:"idvariantvalue" db:"id_variant_value"`
	Idvarianttype  *int    `json:"idvarianttype" db:"id_variant_type"`
	Value          *string `json:"value" db:"value"`
	Name           *string `json:"name" db:"name"`
}
