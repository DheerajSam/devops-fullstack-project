FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
ENV APP_VERSION=v1.0
CMD ["node", "app.js"]
