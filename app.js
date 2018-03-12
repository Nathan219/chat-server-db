'use strict';

const CriticalError = require('error-cat/errors/critical-error');
const ErrorCat = require('error-cat');
const rabbitmq = require('./util/rabbitmq');
const socket = require('./util/socket-server');

const server = require('./workers/server');

return server.start()
  .then(() => rabbitmq.connect())
  .then(() => socket.connect())
  .then(() => console.info('Everything Started'))
  .catch(err => {
    console.error({ err: err }, 'Worker server failed to start');
    ErrorCat.report(new CriticalError(
      'Worker Server Failed to Start',
      { err: err }
    ));
    process.exit(1);
  });