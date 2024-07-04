const publisherService = require('../services/publisherService');

const publishMessage = (req, res) => {
  const message = req.query.message || 'Hello, Kubernetes!';
  publisherService.publishMessage(message);
  res.send(`Message sent to RabbitMQ: ${message}`);
};

module.exports = { publishMessage };
