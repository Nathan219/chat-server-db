'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('messages', function (table) {
    table.increments();
    table.string('author');
    table.string('message', 1000);
    table.timestamp('created').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
