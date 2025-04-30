# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto
RUN yarn build

# Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar sólo archivos necesarios
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Exponer puerto (usado por Azure App Service)
EXPOSE 3000

CMD ["yarn", "start"]
