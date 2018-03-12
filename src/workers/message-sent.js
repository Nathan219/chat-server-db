'use strict';

const Joi = require('joi');
const Messages = require('../models/messages');
const RabbitMQ = require('../util/rabbitmq');

module.exports.jobSchema = Joi.object({
  tid: Joi.string(),
  author: Joi.string().required(),
  message: Joi.string()
}).required();


module.exports.task = function ({ author, message }) {
  return Messages.addMessage(author, message)
    .then(newMessage => RabbitMQ.publishEvent('message.received', newMessage))
};