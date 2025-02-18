# backend

MICROSERVICIO PARA CARGA DE ARCHIVOS

## Installation

Install my-project with go

```bash
  go mod init backend
```

Install dependencies

```bash
  go mod tidy
```

## Deployment

To deploy this project run

```bash
  go run cmd/server/main.go
```

To deploy this project run

```bash
  air
```

## API Reference

#### INSERT FILE

```http
  POST api/files/static
```

| Parameter | Type   | Description                |
| :-------- | :----- | :------------------------- |
| `file`    | `FILE` | **Required**. Your API key |

#### GET FILE

```http
  GET api/files/static/${filename}
```

| Parameter  | Type     | Description             |
| :--------- | :------- | :---------------------- |
| `filename` | `string` | **Required**. uuid file |
