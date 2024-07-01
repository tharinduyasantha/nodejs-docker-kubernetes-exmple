const amqp = require('amqplib/callback_api');
const config = require('../config/rabbitmq');

const subscribeMessages = (callback) => {
  amqp.connect(config.url, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queue = 'hello';

      channel.assertQueue(config.queue, { durable: true });
      channel.consume(config.queue, (msg) => {
        if (msg !== null) {
            console.log(` [x] Received %s`, msg.content.toString());
          callback(msg.content.toString());
          channel.ack(msg);
        }
      });
    });
  });
};

module.exports = { subscribeMessages };
