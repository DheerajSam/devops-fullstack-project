FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
EXPOSE 3000
ENV APP_VERSION=v1.0
CMD ["node", "app.js"]
