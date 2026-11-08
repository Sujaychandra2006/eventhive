FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV VITE_AUTH_ENABLED=false
ENV HOST=0.0.0.0
ENV PORT=8080

EXPOSE 8080

CMD ["node", "scripts/with-app-env.mjs", "vite", "dev", "--host", "0.0.0.0", "--port", "8080"]
