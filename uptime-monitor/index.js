/*
* Main API file
*
*/
//  Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder; //use to convert bytes to string
var config = require('./config');

//  server requests to all requests with a string
var server = http.createServer(function(req, res){

  //Get the url and parse it & return object
  var parsedUrl = url.parse(req.url, true);

  //Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  //Get the query string object
  var queryStringObject = parsedUrl.query;
  //Get the HTTP method
  var method = req.method.toLowerCase();
  //Get the headers as an Object
  var headers = req.headers;
  //Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data){
    //buffer += decoder.write(data);
    buffer += data;
  });
  req.on('end', function(){
    //buffer += decoder.end();
    buffer += 'zzz';

    //Choose the appropiate handler corresponding to the request
    var choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    //Construct the data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    //Route the request to the choosenHandler
    choosenHandler(data, function(statusCode, payload){
      //use the statusCode called back by the handler or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      //use the payload called back by the handler or deafult to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      //Convert the payload to string
      var payloadString = JSON.stringify(payload);

      //Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      //Log the request path
      console.log('Returning this response: ',statusCode, payloadString);

    });

  });

});

//Start the server and have it listen on port 3000
server.listen(config.port, function(){
  console.log('Server is listening on Port '+ config.port+ ' in '+ config.envName +' mode');
})

//define the handlers
var handlers = {};

//Sample Handler
handlers.sample = function(data, callback){
  //callback a HTTP Status Code and a payload object
  callback(406, {'home' : 'sample handler'});
};
//Not Found handler
handlers.notFound = function(data, callback){
  callback(404);
};

//define the router
var router = {
  'sample': handlers.sample
};
