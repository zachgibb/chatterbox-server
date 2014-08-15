var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};
var headers = defaultCorsHeaders;
exports.sendPage = function(response, data, status, type){
  status = status || 200;
  headers["Content-Type"] = "text/html";
  response.writeHead(status, headers);
  fs.readFile(data, function(err, html){
    if(err){
      response.end("file not found");
    }
    response.end(html);
  });
};

exports.sendResponse = function(response, data, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

exports.getMessage = function(request, callback){
  var message = "";
  request.on('data', function(data){
    message+=data;
  });
  request.on('end', function(){
    callback(JSON.parse(message));
  });
};