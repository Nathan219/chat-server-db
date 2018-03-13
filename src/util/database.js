'use strict';

const knexConfigs = require('../../knexfile');

module.exports = require('knex')(knexConfigs[process.env.NODE_ENV]);