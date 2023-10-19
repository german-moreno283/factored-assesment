#Stage 1
FROM node:17-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --force --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]