FROM node:20-alpine

WORKDIR /app/backend

COPY backend/package.json ./
COPY backend/package-lock.json ./
COPY backend/api-gateway/package.json ./api-gateway/package.json
COPY backend/services/auth-service/package.json ./services/auth-service/package.json
COPY backend/services/catalog-service/package.json ./services/catalog-service/package.json
COPY backend/services/communication-service/package.json ./services/communication-service/package.json

RUN npm ci

COPY backend ./

EXPOSE 4001 4002 4003 8080
