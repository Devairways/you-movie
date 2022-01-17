FROM node:12.14-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install

COPY . /usr/src/app
#RUN npm run test

EXPOSE 3000

# FIXME; improve by separating layers into build and publish for smaller docker image
CMD [ "npm", "run", "start" ]