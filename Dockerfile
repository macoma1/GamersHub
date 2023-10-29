# Fase de construcción
FROM node:16 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instalar las dependencias y el CLI de Angular globalmente
RUN npm install -g @angular/cli && npm install

# Copiar el código fuente de la aplicación Angular al contenedor
COPY . .

# Construir la aplicación Angular para producción
RUN ng build --configuration=production

# Fase de ejecución
FROM nginx:alpine

# Copiar la aplicación construida desde la fase de construcción al servidor Nginx
COPY --from=build /app/dist/portfolio-videogames /usr/share/nginx/html



# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
