FROM node:14.16.0-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["run", "start:dev"]
ENTRYPOINT ["npm"]