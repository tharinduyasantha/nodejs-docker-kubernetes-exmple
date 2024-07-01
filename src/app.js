const express = require('express');
const { publishMessage } = require('./controllers/messageController');
const { subscribeMessages } = require('./services/subscriberService');
const port = 7878;

const app = express();

//send route to publish a message
app.get('/send', publishMessage);

app.get('/', (req, res) => {
  res.send('Use /send?message=YourMessage');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});

// Start the subscriber to listen for messages
subscribeMessages((message) => {
  console.log(`Received message: ${message}`);
});
