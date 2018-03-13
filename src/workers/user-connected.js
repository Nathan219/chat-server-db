'use strict';

const Joi = require('joi');
const Messages = require('../models/messages');
const RabbitMQ = require('../util/rabbitmq');

module.exports.jobSchema = Joi.object({
  tid: Joi.string(),
  socketId: Joi.string().required()
}).required();


module.exports.task = function userConnected (job) {
  return Messages.fetchRecent(20)
    .then(messages => {
      return RabbitMQ.publishEvent('messages.requested', {
        socketId: job.socketId,
        messages: messages
      })
    });
};