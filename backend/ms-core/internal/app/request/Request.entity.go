package request

type Variant struct {
	Name  string `json:"name"  binding:"required"`
	Value string `json:"value"  binding:"required"`
}

type RequestEntity struct {
	Slug    string    `json:"slug" binding:"required"`
	Variant []Variant `json:"variant" binding:"required"`
}