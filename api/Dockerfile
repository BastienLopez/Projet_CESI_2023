# Étape de construction
FROM node:16 as builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY ./src ./src
COPY ./config ./config
RUN npm run build

# Étape de production
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/build ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/config ./config
RUN touch .env

CMD ["node", "index.js"]