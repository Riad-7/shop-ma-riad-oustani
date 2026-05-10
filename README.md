# Shop Ma Riad

Projet e-commerce base sur une architecture microservices:
- frontend React/Vite
- API Gateway Express
- services `auth`, `catalog`, `communication`
- MongoDB + RabbitMQ

## Architecture

```text
frontend -> api-gateway -> auth-service
                        -> catalog-service
                        -> communication-service

auth/catalog/communication -> RabbitMQ exchange (shop.events)
services -> MongoDB
```

## Prerequis

### Option A: execution avec Docker (recommandee)
- Docker Desktop (avec Docker Compose v2)

### Option B: execution sans Docker
- Node.js 22+
- npm 10+
- MongoDB sur `localhost:27017`
- RabbitMQ sur `localhost:5672`

## Configuration

Copier le fichier d'environnement:

```bash
cp backend/.env.example backend/.env
```

PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

Admin par defaut:
- Email: `admin@shop.ma`
- Password: `123456`

## Lancer le projet avec Docker

Depuis la racine:

```bash
docker compose up --build -d
```

Verifier l'etat:

```bash
docker compose ps
```

Arreter:

```bash
docker compose down
```

Arreter + supprimer volumes (reset DB):

```bash
docker compose down -v
```

## Lancer le projet sans Docker

### 1) Installer les dependances

```bash
npm install
npm run backend:install
```

### 2) Verifier MongoDB et RabbitMQ

- MongoDB: `localhost:27017`
- RabbitMQ: `localhost:5672`

### 3) Demarrer tout en une commande

```bash
npm run start:all
```

Ce script lance:
- frontend (`5173`)
- `auth-service` (`4001`)
- `catalog-service` (`4002`)
- `communication-service` (`4003`)
- `api-gateway` (`8080`)

Logs locaux:
- Frontend: `logs/frontend.log`
- Backend: `backend/logs/*.log`

### Demarrage manuel service par service (optionnel)

Terminal 1 (frontend, racine):

```bash
npm run dev
```

Terminal 2 (backend):

```bash
cd backend
npm run dev:auth
```

Terminal 3 (backend):

```bash
cd backend
npm run dev:catalog
```

Terminal 4 (backend):

```bash
cd backend
npm run dev:communication
```

Terminal 5 (backend):

```bash
cd backend
npm run dev:gateway
```

## URLs utiles

- Frontend: `http://localhost:5173`
- API Gateway: `http://localhost:8080`
- Auth service: `http://localhost:4001`
- Catalog service: `http://localhost:4002`
- Communication service: `http://localhost:4003`
- RabbitMQ UI: `http://localhost:15672` (`guest` / `guest`)

## Troubleshooting rapide

- Voir les logs Docker:

```bash
docker compose logs -f
```

- Rebuild propre:

```bash
docker compose down -v --remove-orphans
docker compose up --build -d
```

- Si un port est deja occupe (`5173`, `8080`, `4001`, `4002`, `4003`, `5672`, `27017`), liberer le port ou changer le mapping.
