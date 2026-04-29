# Shop Ma Riad

Projet e-commerce front + backend microservices.

## Stack

- Frontend: React + Vite
- API Gateway: Node.js + Express
- Microservices:
  - `auth-service`: authentification JWT + admin seed
  - `catalog-service`: produits + commandes + statistiques
  - `communication-service`: messages contact + chat + event log
- Base de donnees: MongoDB
- Messaging: RabbitMQ
- Conteneurisation: Docker Compose

## Architecture

```text
frontend -> api-gateway -> auth-service
                        -> catalog-service
                        -> communication-service

catalog/auth/services -> RabbitMQ exchange (shop.events) -> communication-service consumer
services -> MongoDB
```

## Lancer avec Docker

```bash
docker compose up --build
```

Services exposes:

- Frontend: `http://localhost:5173`
- API Gateway: `http://localhost:8080`
- Auth Service: `http://localhost:4001`
- Catalog Service: `http://localhost:4002`
- Communication Service: `http://localhost:4003`
- MongoDB: `mongodb://localhost:27017`
- RabbitMQ: `http://localhost:15672` (`guest` / `guest`)

## Variables d'environnement

Copier [backend/.env.example](/c:/Users/riado/OneDrive/Bureau/Front-End-Projects/shop-ma-riad-oustani/backend/.env.example) vers `backend/.env`.

Admin par defaut:

- Email: `admin@shop.ma`
- Password: `123456`

## Scripts utiles

Depuis la racine:

```bash
npm run dev
npm run backend:install
npm run gateway:dev
```

Depuis `backend/`:

```bash
npm install
npm run dev:gateway
npm run dev:auth
npm run dev:catalog
npm run dev:communication
```

## Notes

- Le frontend n'utilise plus `fakestoreapi` ni `localStorage` pour l'admin.
- Le chat est gere par `communication-service` avec reponses intelligentes simples sans dependance externe.
- Le `communication-service` consomme aussi les evenements RabbitMQ pour garder une trace de l'activite produits/commandes/auth.
