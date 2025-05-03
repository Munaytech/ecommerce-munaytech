package utils

import (
	"encoding/json"
	"fmt"
	"path"
	"reflect"
	"runtime"
)

// PrintJSON simula un console.log en Go, mostrando tipo, archivo, línea y contenido JSON
func PrintJSON(v interface{}) {
	_, file, line, ok := runtime.Caller(1)
	if !ok {
		file = "???"
		line = 0
	}

	filename := path.Base(file)
	typeName := reflect.TypeOf(v).String()

	jsonData, err := json.Marshal(v)
	if err == nil && (reflect.TypeOf(v).Kind() == reflect.Struct || reflect.TypeOf(v).Kind() == reflect.Map || reflect.TypeOf(v).Kind() == reflect.Slice) {
		fmt.Printf("📌 %s:%d | %s\n", filename, line, string(jsonData))
		return
	}

	fmt.Printf("📌 %s:%d | type: %s | %v\n", filename, line, typeName, v)
}



// package utils

// import (
// 	"encoding/json"
// 	"fmt"
// 	"reflect"
// )

// // PrintJSON imprime una estructura en JSON en una sola línea con el nombre de su tipo
// func PrintJSON(v interface{}) {
// 	jsonData, err := json.Marshal(v)
// 	if err != nil {
// 		fmt.Println("Error al convertir a JSON:", err)
// 		return
// 	}

// 	typeName := reflect.TypeOf(v).Name()
// 	fmt.Printf("📌 %s: %s\n", typeName, string(jsonData))
// }
