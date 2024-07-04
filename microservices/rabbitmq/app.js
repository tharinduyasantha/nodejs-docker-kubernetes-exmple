const express = require('express');
const port = 7880;

const app = express();

app.get('/', (req, res) => {
  res.send('RabbitMQ Service is running');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`RabbitMQ Service is listening on ${port}`);
});
