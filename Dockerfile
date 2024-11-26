# Dockerfile

# Stage: Build
FROM node:18-alpine3.19 as build

WORKDIR /app
COPY ./ ./

RUN npm install
RUN npm run test
RUN npm run build

# Stage: Production
FROM node:18-alpine3.19 as production

WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci --only=production
COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
