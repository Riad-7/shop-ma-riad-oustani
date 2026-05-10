FROM alpine:3.22 AS build

RUN apk add --no-cache nodejs npm

WORKDIR /app

ARG VITE_API_URL=http://localhost:8080/api
ENV VITE_API_URL=$VITE_API_URL

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --no-audit --fetch-retries=5 --fetch-retry-maxtimeout=120000 --fetch-retry-mintimeout=20000

COPY . ./

RUN npm run build

FROM nginx:1.27-alpine

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
