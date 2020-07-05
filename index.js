// Dependencies
const http = require('http');

// Server should respond to all requests with a string
const server = http.createServer(function(req, res) {
  res.end('Hello NodeJS\n');
})

// Port to listen
const portNumber = 9000;

// Start the server, and have it listen on portNumber
server.listen(portNumber, function() {
  console.log(`The server is listening on port ${portNumber}...`)
})