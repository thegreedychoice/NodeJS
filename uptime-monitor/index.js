/*
* Main API file
*
*/
//  Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder; //use to convert bytes to string
var fs = require('fs');
var config = require('./lib/config');
var _data = require('./lib/data');
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');


//  Instantiating HTTP Server
var httpServer = http.createServer(function(req, res){
  unifiedServer(req, res)
});

//Start the HTTP server
httpServer.listen(config.httpPort, function(){
  console.log('HTTP Server is listening on Port '+ config.httpPort+ ' in '+ config.envName +' mode');
});

//  Instantiating HTTPS Server
var httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
}
var httpsServer = https.createServer(httpsServerOptions, function(req, res){
  console.log('https');
  unifiedServer(req, res)
});

//Start the HTTP server
httpsServer.listen(config.httpsPort, function(){
  console.log('HTTPs Server is listening on Port '+ config.httpsPort+ ' in '+ config.envName +' mode');
});

//Server Logic for both http and https
var unifiedServer = function (req, res){
  //Get the url and parse it & return object
  var parsedUrl = url.parse(req.url, true);

  //Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'').toLowerCase();
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
    //buffer += '';

    //Choose the appropiate handler corresponding to the request
    var choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    //Construct the data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJSONToObject(buffer)
    };

    //console.log(data);

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
};



//define the router
var router = {
  'ping': handlers.ping,
  'helloworld': handlers.helloWorld,
  'users': handlers.users,
  'tokens': handlers.tokens
};
