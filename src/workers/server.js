'use strict';

const ErrorCat = require('error-cat');
const ponos = require('ponos');

/**
 * The big-poppa ponos server.
 * @type {ponos~Server}
 * @module big-poppa/worker
 */
module.exports = new ponos.Server({
  name: 'message-store',
  enableErrorEvents: true,
  rabbitmq: {
    channel: {
      prefetch: process.env.RABBITMQ_PREFETCH
    },
    hostname: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    username: 'guest',
    password: 'guest'
  },
  errorCat: ErrorCat,
  events: {
    'message.sent': require('./message-sent'),
    'user.connected': require('./user-connected')
  }
});