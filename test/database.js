'use strict';
const connection = {
  host :     process.env.DB_URL || 'localhost',
  database: 'test',
  user:     'postgres',
  password: 'postgres'
};

const knexConfig = {
  client: 'pg',
  connection,
  pool: {
    min: 1,
    max: 200
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
const TEST_DB = 'test';
class Db {
  constructor () {
    this.knex = require('knex')(knexConfig);
  }
  createDb () {
    connection.database = 'postgres';
    this.knex.destroy();
    this.knex = require('knex')(knexConfig);
    return this.knex.raw(`CREATE DATABASE ${TEST_DB}`)
      .catch(() => {})
      .then(() => {
        this.knex.destroy();
        connection.database = TEST_DB;
        this.knex = require('knex')(knexConfig);
      });
  }
}

module.exports = new Db();
