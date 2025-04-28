# Etapa 1: Instalar solo dependencias
FROM node:20-alpine AS deps

# Instalamos compatibilidad necesaria para dependencias nativas
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiamos solo los archivos de dependencias
COPY package.json yarn.lock ./

# Instalamos TODAS las dependencias (incluyendo devDependencies necesarias para build)
RUN yarn install --frozen-lockfile

# Etapa 2: Construcción de la aplicación
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos node_modules desde deps para cachear
COPY --from=deps /app/node_modules ./node_modules

# Copiamos el resto del código fuente
COPY . .

# Compilamos la aplicación Next.js para producción
RUN yarn build

# Etapa 3: Imagen final para producción
FROM node:20-alpine AS runner

# Configuramos directorio de trabajo
WORKDIR /app

# Copiamos sólo los archivos necesarios
COPY package.json yarn.lock ./

# Instalamos solo dependencias de producción
RUN yarn install --production --frozen-lockfile

# Copiamos el build generado y otros archivos esenciales
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.ts next.config.ts

# (Opcional) copiar también tsconfig.json o .env si lo usas
# COPY --from=builder /app/tsconfig.json tsconfig.json
# COPY --from=builder /app/.env .env

# Seguridad: crear usuario no-root
# RUN adduser --disabled-password --gecos "" appuser && \
#     chown -R appuser:appuser /app

# USER appuser

# Expone el puerto en el que Next.js corre (por defecto 3000)
EXPOSE 3000

# Comando para iniciar el servidor de producción de Next.js
CMD ["yarn", "start"]

