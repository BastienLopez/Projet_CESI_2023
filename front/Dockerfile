# build env
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run-script build

# production env
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]