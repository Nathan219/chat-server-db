FROM node:6.13.1

ADD . /chat-server
WORKDIR /chat-server

RUN npm install

CMD sleep 10; npm run start:production