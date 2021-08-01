FROM node:14-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

COPY . .

EXPOSE 3000

CMD ["node", "./dist/app.js"]