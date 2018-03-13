'use strict';

const Promise = require('bluebird');
const expect = require('expect.js');
const knexModel = require('../database');
const messages = require('../../src/models/messages');


const user1 = 'user1';
const user2 = 'user2';
const message1 = 'asdasdasdasd';

describe('Messages model intergration test', () => {
  before(() => knexModel.createDb());
  before(() => knexModel.knex.migrate.latest());
  afterEach(() => knexModel.knex('messages').select('*').del());

  describe('addMessage', () => {
    it('should add a message', () => {
      return messages.addMessage(user1, message1)
        .tap(message => expect(message.author).to.equal(user1))
        .tap(message => expect(message.message).to.equal(message1));
    });
  });


  describe('fetchRecent', () => {
    it('should add a message', () => {
      const messageArray = [];
      for (let x = 0; x < 30; x++) {
        messageArray.push(x.toString());
      }
      return Promise.each(messageArray, (message) => messages.addMessage(user1, message))
        .then(() => {
          return messages.fetchRecent(20)
        })
        .tap(messages => expect(messages).to.have.length(20))
        .tap(messages => expect(messages[0].message).to.equal('10'))
        .tap(messages => expect(messages[19].message).to.equal('29'));
    });
  });
});
