var fs = require("fs");
var datas = require(__dirname + "/data.js").data;

/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
  
exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  console.log("Serving request type " + request.method + " for url " + request.url);


  var headers = defaultCorsHeaders;
  var statusCode;
 


  // check url
  if(request.url === "/classes/messages"){
    headers['Content-Type'] = "application/json";
    //do some work

    if(request.method === "GET"){
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(datas));
    }

    else if(request.method === "POST"){
      statusCode = 201;
      console.log('trying to post');

      var body = "";
      request.on('data', function(data){

        body+=data;
        datas.results.push(JSON.parse(body));
        
      })
      response.writeHead(statusCode, headers);
      response.end("Data");
    }

    

  } else{
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end("page not found!");

  }


  // var statusCode = 200;
  // response.writeHead(statusCode, headers);
  // response.end("Hello, World!");



};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/plain"
};
  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */

  /* .writeHead() tells our server what HTTP status code to send back */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

 // WHEN WE GET BACK
   // what happens when GET
   // what happens for POST
   // where are we storing our data?
  // fs.appendFile(__dirname + "/data.json", JSON.stringify({}), function(error){

  //   if (error) {console.log('error writing to data file', error);}
  //   console.log("data written");

    // fs.readFile(__dirname + "/data.js", "utf8", function(error, data){

    //   if (error){console.log(error);}
    // datas.results.push({data:'hello'});
    //   // array.push(data)
    //   console.log('read file', data);

    // });

  // });
