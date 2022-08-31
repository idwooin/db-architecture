From node:alpine

WORKDIR /usr/app
COPY ./ .

COPY package*.json ./
RUN yarn install

RUN yarn global add nodemon
RUN yarn global add sequelize-cli

CMD ["nodemon","-L","server.js"]