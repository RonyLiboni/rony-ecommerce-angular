FROM node:18.16 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:1.21
COPY --from=node /app/dist/rony-ecommerce /usr/share/nginx/html
EXPOSE 80
