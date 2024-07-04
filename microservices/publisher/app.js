const express = require('express');
const { publishMessage } = require('./src/controllers/messageController');
const port = 7878;

const app = express();

app.get('/send', publishMessage);

app.get('/', (req, res) => {
  res.send('Use /send?message=YourMessage');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Publisher Service is listening on ${port}`);
});
