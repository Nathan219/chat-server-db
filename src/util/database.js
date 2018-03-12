'use strict';

module.exports = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DB_URL,
    database: 'postgres',
    user:     'postgres',
    password: 'postgres'
  },
  pool: {
    min: 2,
    max: 10
  }
});