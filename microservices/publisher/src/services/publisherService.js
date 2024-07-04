const amqp = require('amqplib/callback_api');
const config = require('../config/rabbitmq');

const publishMessage = (message) => {
  amqp.connect(config.url, (err, connection) => {
    if (err) {
      throw err;
    }
    connection.createChannel((err, channel) => {
      if (err) {
        throw err;
      }
      channel.assertQueue(config.queue, { durable: true }); 
      channel.sendToQueue(config.queue, Buffer.from(message));
      console.log(" [x] Sent %s", message);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = { publishMessage };
