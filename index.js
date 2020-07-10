// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// Server should respond to all requests with a string
const server = http.createServer(function (req, res) {
  // Get the URL and parse it
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;

  // Get the HTTP Method
  var trimmedPath = path.replace(/^\/+|\/$/g, "");

  // Get the query string as an obj
  var queryStringObj = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLocaleLowerCase();

  // Get the Headers
  var headers = req.headers;

  // Get the payload, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function end() {
    buffer += decoder.end();

    // Send the response
    res.end(`Hello NodeJS\n`);
    console.log("Received payload:", buffer);
  });
});

// Port to listen
const portNumber = 9000;

// Start the server, and have it listen on portNumber
server.listen(portNumber, function () {
  console.log(`The server is listening on port ${portNumber}...`);
});
