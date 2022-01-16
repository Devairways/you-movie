FROM node:12.14-alpine

WORKDIR /usr/src/you-movie

COPY package.json /usr/src/you-movie/package.json

RUN npm install --silent

COPY . /usr/src/you-movie
#RUN npm run test

EXPOSE 3000

CMD npm run start