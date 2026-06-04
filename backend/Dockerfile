FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/
RUN npm install
COPY backend backend
RUN npm run build --workspace backend

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/
RUN npm install --omit=dev
COPY --from=build /app/backend/dist backend/dist
CMD ["npm", "run", "start", "--workspace", "backend"]
