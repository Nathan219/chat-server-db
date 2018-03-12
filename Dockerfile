FROM node:6.13.1

ADD . /chat-server
WORKDIR /chat-server

RUN npm install

EXPOSE 5000

CMD npm start