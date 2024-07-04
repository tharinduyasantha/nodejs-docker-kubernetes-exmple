const express = require('express');
const { subscribeMessages } = require('./src/services/subscriberService');
const port = 7879;

const app = express();

app.get('/', (req, res) => {
  res.send('Subscriber Service is running');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Subscriber Service is listening on ${port}`);
});

// Start the subscriber to listen for messages
subscribeMessages((message) => {
  console.log(`Received message: ${message}`);
});
