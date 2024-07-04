const amqp = require('amqplib/callback_api');
const config = require('../config/rabbitmq');

const sendMessage = (message) => {
  amqp.connect(config.url, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(config.queue, { durable: false });
      channel.sendToQueue(config.queue, Buffer.from(message));
      console.log(" [x] Sent %s", message);
    });
    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = { sendMessage };
