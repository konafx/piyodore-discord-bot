FROM node:18-slim

WORKDIR /app

ENV TZ Asia/Tokyo

ARG DISCORD_BOT_TOKEN
ARG DISCORD_BOT_CLIENT_ID
ARG DISCORD_BOT_GUILD_ID

COPY package.json yarn.lock ./
RUN yarn install

CMD ["yarn", "run", "dev:watch"]
