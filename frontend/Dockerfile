FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_API_URL=http://localhost:4000/api
ENV VITE_API_URL=$VITE_API_URL
COPY package*.json ./
COPY frontend/package*.json frontend/
RUN npm install
COPY frontend frontend
RUN npm run build --workspace frontend

FROM node:22-alpine
WORKDIR /app/frontend
ENV NODE_ENV=production
COPY --from=build /app/frontend/dist dist
COPY --from=build /app/frontend/serve.cjs serve.cjs
EXPOSE 5173
CMD ["node", "serve.cjs", "--port", "5173"]
