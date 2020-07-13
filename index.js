// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");

// Server should respond to all requests with a string
const server = http.createServer(function (req, res) {
  // Get the URL and parse it
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var pathname = parsedUrl.pathname;

  // Get the HTTP Method
  var path = pathname.replace(/^\/+|\/$/g, "");

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

    // Choose the handler thi request should go to. If not found, use notFound handler
    var route = path in router;
    var chosenHandler = route ? router[path] : handlers.notFound;

    // Construct the data object to send to th handler
    var data = {
      path: path,
      queryStringObject: queryStringObj,
      method: method,
      headers: headers,
      payload: buffer,
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function cb(statusCode, payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use the payload called back by the handler, or default to empty object
      payload = typeof payload == "object" ? payload : {};

      // Convert to string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log("Returning this response:", statusCode, payloadString);
    });
  });
});

// Port to listen
const portNumber = config.port;

// Start the server, and have it listen on portNumber
server.listen(portNumber, function () {
  console.log(
    `The server is listening on port ${portNumber} in ${config.envName} mode...`
  );
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.sample = function (data, cb) {
  // Callback a http status code, and a payload object
  cb(406, { name: "sample handler" });
};

handlers.notFound = function (data, cb) {
  cb(404);
};

// Define a request router
var router = {
  sample: handlers.sample,
};
