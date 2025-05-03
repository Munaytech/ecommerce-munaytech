package entity

type UserEntity struct {
	Iduser        *int    `json:"iduser" db:"id_user"`
	Iduserauth    *int    `json:"iduserauth" db:"id_user_auth"`
	Fullname      *string `json:"fullname" db:"full_name"`
	Createdat     *string `json:"createdat" db:"created_at"`
	Userimagetext *string `json:"userimagetext" db:"user_image_text"`
}
