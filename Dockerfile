FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci --only=production

RUN npm run prisma:generate

FROM node:14

COPY --from=build /app /app

WORKDIR /app

CMD ["npm", "run", "prod"]
