FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV APP_VERSION=v1.0

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm uninstall -g npm

USER node

EXPOSE 3000

CMD ["node", "app.js"]