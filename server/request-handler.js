var parseUrl = require('url');
var fs = require('fs');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var headers = defaultCorsHeaders;
var allMessages = [];

var sendPage = function(response, data, status, type){
  status = status || 200;
  headers["Content-Type"] = "text/html";
  response.writeHead(status, headers);
  fs.readFile(data, function(err, html){
    if(err){
      response.end("file not found");
    }
    response.end(html);
  })
};

var sendResponse = function(response, data, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

var getMessage = function(request, callback){
  var message = "";
  request.on('data', function(data){
    message+=data;
  });
  request.on('end', function(){
    callback(JSON.parse(message));
  });
};

var paths = {
  "/classes/messages": 1,
  "/classes/room": 1,
  "/classes/room1": 1
};

exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  console.log("Serving request type " + request.method + " for url " + request.url);
  var fullUrl = parseUrl.parse(request.url);
  var baseUrl = fullUrl.pathname;
  // "http:" + "//" + "localhost:3000" + '/classes/messages'

 if(paths[baseUrl]){
    switch(request.method){
      case "GET":
        sendResponse(response, {"results": allMessages});
        break;
      case "POST":
        getMessage(request, function(message){
          allMessages.unshift(message);
          sendResponse(response, null, 201);
        });
        break;
      case "OPTIONS":
        sendResponse(response);
        break;
      
    }

  } else if (baseUrl === '/') {
    console.log('you are trying to get the html page');
    sendPage(response, "./client/index.html");
    
  } else{
    sendResponse(response, 'not found', 404);
  }


};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */