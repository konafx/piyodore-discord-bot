FROM node:18-alpine AS builder
WORKDIR /base

COPY package.json .
ENV YARN_VERSION 3.3.1
RUN yarn set version $YARN_VERSION

RUN yarn install

FROM node:18-slim AS app

WORKDIR /app

ENV TZ Asia/Tokyo

ARG DISCORD_BOT_TOKEN
ARG DISCORD_BOT_CLIENT_ID
ARG DISCORD_BOT_GUILD_ID

COPY --from=builder /base/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /base/.yarn ./.yarn
COPY --from=builder /base/.pnp.cjs ./.pnp.cjs
COPY --from=builder /base/yarn.lock ./yarn.lock
COPY --from=builder /base/package.json ./package.json

CMD ["yarn", "run", "dev:watch"]
