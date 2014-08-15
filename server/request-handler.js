var parseUrl = require('url');
var fs = require('fs');
var utils = require('./utils');



/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var allMessages = [];

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
        utils.sendResponse(response, {"results": allMessages});
        break;
      case "POST":
        utils.getMessage(request, function(message){
          allMessages.unshift(message);
          utils.sendResponse(response, null, 201);
        });
        break;
      case "OPTIONS":
        utils.sendResponse(response);
        break;
      
    }

  } else if (baseUrl === '/') {
    console.log('you are trying to get the html page');
    utils.sendPage(response, "./client/index.html");

  } else{
    utils.sendResponse(response, 'not found', 404);
  }


};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */