# 🚀 Deploy de Proyecto Next.js con Docker

Este proyecto contiene una aplicación **Next.js** que puede ser desplegada usando **Docker** en **modo desarrollo** y **modo producción**.

---

## 📦 Variables de Entorno

Crea un archivo `.env.local` en la raíz de tu proyecto para tus configuraciones locales.

**Ejemplo de `.env.local`:**

```dotenv
# Puerto en el que correrá Next.js
PORT=3000

# Variables de entorno de tu aplicación
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXX-X
```

**Importante:**  
- Variables que empiezan con `NEXT_PUBLIC_` estarán disponibles también en el navegador.

---

## 🛠️ Cómo correr el proyecto en modo **desarrollo local** (sin Docker)

1. Instala dependencias:

   ```bash
   yarn install
   ```

2. Levanta el servidor de desarrollo:

   ```bash
   yarn dev
   ```

Esto iniciará la aplicación Next.js en modo desarrollo con hot reload en [http://localhost:3000](http://localhost:3000).

---

## 🐳 Cómo correr el proyecto en modo **desarrollo** usando **Docker**

1. Construye la imagen de desarrollo:

   ```bash
   docker build -t nextjs-dev -f Dockerfile.dev .
   ```

2. Corre el contenedor en modo desarrollo:

   ```bash
   docker run -it --rm -p 3000:3000 --env-file .env.local nextjs-dev yarn dev
   ```

- `-it` → modo interactivo para ver logs en consola.
- `--rm` → elimina el contenedor al detenerse.
- `-p 3000:3000` → expone el puerto 3000 del contenedor a tu máquina local.
- `--env-file .env.local` → carga las variables de entorno.

Accede a tu aplicación en [http://localhost:3000](http://localhost:3000)

---

## 📦 Cómo correr el proyecto en modo **producción** usando **Docker**

1. Construye la imagen de producción:

   ```bash
   docker build -t nextjs-prod .
   ```

2. Corre el contenedor en modo producción:

   ```bash
   docker run -d -p 3000:3000 --env-file .env.local nextjs-prod
   ```

- `-d` → corre en modo "detached" (en background).
- `-p 3000:3000` → expone el puerto de producción.
- `--env-file .env.local` → carga tus variables.

Accede a tu aplicación en [http://localhost:3000](http://localhost:3000)

---

## 🐳 Comandos Rápidos de Docker

| Acción | Comando |
|:--|:--|
| **Build imagen producción** | `docker build -t nextjs-prod .` |
| **Run contenedor producción** | `docker run -d -p 3000:3000 --env-file .env.local nextjs-prod` |
| **Build imagen desarrollo** | `docker build -t nextjs-dev -f Dockerfile.dev .` |
| **Run contenedor desarrollo** | `docker run -it --rm -p 3000:3000 --env-file .env.local nextjs-dev yarn dev` |
| **Listar imágenes** | `docker images` |
| **Listar contenedores** | `docker ps -a` |
| **Detener contenedor** | `docker stop <container_id>` |
| **Eliminar contenedor** | `docker rm <container_id>` |
| **Eliminar imagen** | `docker rmi <image_id>` |

---

## 🚹 Buenas prácticas

- Usa `.dockerignore` para evitar copiar archivos innecesarios.
- No uses `latest` como única tag en producción, crea versiones específicas.
- Mantén tus variables sensibles fuera del control de versiones.
- Utiliza un usuario no-root dentro del contenedor para mejorar la seguridad.
- Versiona y documenta tus cambios en despliegues.


# 🌟 Notas Finales

- Considera desplegar tu contenedor usando servicios como AWS ECS, Kubernetes, Vercel, o Fly.io para entornos de producción.
- Siempre prueba localmente tus imágenes Docker antes de hacer deploy real.
- Mantén monitoreo, backups y actualizaciones de seguridad en producción.

