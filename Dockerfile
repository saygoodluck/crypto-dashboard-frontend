FROM node:23-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]