const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
  response.end('Hello, Kubernetes!');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});
