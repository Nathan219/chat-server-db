'use strict';

const knex = require('../util/database');
const Promise = require('bluebird');

class Messages {
  constructor() {}

  /**
   * Adds a message to the list as a new object, and include a timestamp of when it occurred.  If this message puts
   * the list over the limit, we need to remove the first message from the list.  We also need to save the users name
   * in our user list.
   *
   * @param {String} author - the username of the writer of the message
   * @param {String} message - message written into the chat application
   *
   * @returns undefined
   */
  static addMessage (author, message) {
    const newMessage = {
      created: new Date().toISOString(),
      author,
      message
    };
    return Promise.resolve(
      knex('messages')
        .insert(newMessage)
    )
      .return(newMessage);
  }

  /**
   * Returns the last count number messages sent to this application
   *
   * @param {Number} count - number of messages to send
   *
   * @resolves {Object[]} message           - the list of no more than 100 of the last messages sent to this application
   *           {Number}   message.timestamp - timestamp (in epoch time) of when this message was created
   *           {String}   message.user      - the user who wrote this message
   *           {String}   message.text      - the text that the user sent
   */
  static fetchRecent (count) {
    return Promise.resolve(
      knex('messages')
        .select('author', 'message', 'created')
        .orderBy('id', 'desc')
        .limit(count)
    )
      .then(messages => messages.reverse());
  }
}


module.exports = Messages;
