package entity

type CategoryEntity struct {
	Idcategory       *int              `json:"idcategory" db:"id_category"`
	Namecategory     *string           `json:"namecategory" db:"name_category"`
	Parentidcategory *int              `json:"parentidcategory" db:"parent_id_category"`
	Pathidcategory   *string           `json:"pathidcategory" db:"path_id_category"`
	Fullpath         *string           `json:"fullpath" db:"full_path"`
	State            *bool             `json:"state" db:"state"`
	Level            *int              `json:"level" db:"level"`
	Children         []*CategoryEntity `json:"children,omitempty"`
}
