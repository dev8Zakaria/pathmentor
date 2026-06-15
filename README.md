# PathMentor AI

Application web intelligente pour orienter un etudiant vers un metier informatique, diagnostiquer son niveau et generer une roadmap personnalisee.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, TypeScript, JWT, Mongoose
- Donnees: MongoDB, Redis, Neo4j
- IA MVP: Gemini via Google Generative Language API, avec fallback deterministe utilisable sans cle API

## Demarrage avec Docker Compose

```bash
docker compose up -d
```

Backend: `http://localhost:4000`
Frontend: `http://localhost:5173`
Neo4j browser: `http://localhost:7474`
Mongo Express: `http://localhost:8081`
Redis Commander: `http://localhost:8082`

Le compose lance:

- MongoDB
- Redis
- Redis Commander
- Neo4j
- Mongo Express
- le seed initial MongoDB + Neo4j
- l'API Express
- le frontend React compile

Les services applicatifs utilisent l'image officielle `node:22-alpine`; aucune image custom n'est construite. Au premier lancement, les containers installent les dependances avec npm, puis lancent le seed, l'API et le frontend.

Le service `seed` est idempotent par defaut: il ajoute ou met a jour les donnees de demonstration sans vider les donnees existantes.

Pour forcer un reset complet des donnees de demo:

```bash
docker compose run --rm -e RESET_DATABASE=true seed
```

## Compte de demonstration

Apres le seed:

- Email: `student@pathmentor.ai`
- Mot de passe: `Password123!`
- Admin: `admin@pathmentor.ai`
- Mot de passe: `Admin123!`

Mongo Express:

- URL: `http://localhost:8081`
- User: `admin`
- Password: `pathmentor`

Redis Commander:

- URL: `http://localhost:8082`
- User: `admin`
- Password: `pathmentor`

Do not open `http://localhost:6379` in the browser. Port `6379` is the raw Redis protocol port used by the backend and Redis CLI, not an HTTP web interface.

## Gemini / LLM

Le backend utilise Gemini quand `AI_PROVIDER=gemini` et `GEMINI_API_KEY` sont presents dans le fichier `.env` a la racine du projet. Docker Compose lit ce fichier automatiquement.

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3-flash-preview
JWT_ACCESS_SECRET=change_me_access_secret
JWT_REFRESH_SECRET=change_me_refresh_secret
```

Si la cle ou le modele ne fonctionne pas, le backend garde un fallback deterministe pour que le quiz, la roadmap et le mentor restent utilisables.

## Demarrage local npm

```bash
npm install
docker compose up -d mongodb redis neo4j
npm run seed
npm run build
npm run start --workspace backend
npm run serve --workspace frontend
```

## Fonctionnalites MVP

- Inscription, connexion, refresh token
- Profil utilisateur et choix d'objectif metier
- Entretien IA simple
- Quiz diagnostic par metier
- Generation et suivi de roadmap
- Chat mentor IA contextualise
- Catalogue ressources/projets
- Administration des metiers, competences, ressources et statistiques
- Seed MongoDB + graphe Neo4j initial
- Redis pour refresh tokens, cache et file BullMQ de generation roadmap
