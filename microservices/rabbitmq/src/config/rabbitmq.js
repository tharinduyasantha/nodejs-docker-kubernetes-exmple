module.exports = {
    url: process.env.RABBITMQ_URL || 'amqp://localhost', //http://127.0.0.1:15672/ //amqp://localhost
    queue: 'hello',
  };
  