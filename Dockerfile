# Базовый образ
FROM node:22 AS base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Сборка клиента (Next.js)
FROM base AS build-client

WORKDIR /app/client

COPY client/package.json client/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY client ./
RUN yarn build

# Сборка сервера (NestJS)
FROM base AS build-server

WORKDIR /app/server

COPY server/package.json server/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY server ./
RUN yarn prisma generate
RUN yarn build

# Финальный образ для продакшна
FROM node:22 AS production

ENV NODE_ENV=production

WORKDIR /app

# Устанавливаем зависимости для продакшна
COPY --from=build-server /app/server/package.json /app/server/yarn.lock ./server/
COPY --from=build-server /app/server/node_modules ./server/node_modules
COPY --from=build-server /app/server/dist ./server/dist
COPY --from=build-server /app/server/prisma/generated ./server/prisma/generated

COPY --from=build-client /app/client/package.json /app/client/yarn.lock ./client/
COPY --from=build-client /app/client/node_modules ./client/node_modules
COPY --from=build-client /app/client/.next ./client/.next

# Запуск процессов сервера и клиента
CMD ["sh", "-c", "node server/dist/main & yarn --cwd client start"]
