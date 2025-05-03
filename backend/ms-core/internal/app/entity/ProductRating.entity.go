package entity

type ProductRatingEntity struct {
	Idproduct  *int     `json:"idproduct" db:"id_product"`
	Iduser     *int     `json:"iduser" db:"id_user"`
	Rating     *float64 `json:"rating" db:"rating"`
	Reviewtext *string  `json:"reviewtext" db:"review_text"`
	Ratedat    *string  `json:"ratedat" db:"rated_at"`

	Fullname      *string `json:"fullname" db:"full_name"`
	Userimagetext *string `json:"userimagetext" db:"user_image_text"`
}
