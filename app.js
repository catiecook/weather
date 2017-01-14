var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();


//*******************************
//http-proxy data
var http = require('http');
var url = require('url');

var httpProxy = require('http-proxy').createServer(function(req, res, proxy) {
  proxy.proxyRequest(req, res, {
    host: 'secure.target.host',
    port: 443,
    target: {
      https: true
    }
  })
}).listen(8080)


// Create your proxy server and set the target in the options.
// DEFAULT BACK TO THIS httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(8000);
// // Create your target server
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
//   res.end();
// }).listen(9000);
//
// console.log("http PROXY server on port 8000");
// console.log("http server on port 9000");

// function notFound(res) {
//   res.writeHead(404, "text/plain");
//   res.end("404: File not found");
// }
//
// http.createServer((b_req, b_res)=>{
//   //part of url library, takes string and breaks into object with properties
//   var b_url = url.parse(b_req.url, true);
//   if(!b_url.query || !b_url.query.url) return notFound(b_res);
//
//   //read and parse the url parameter
//   var p_url = url.parse(b_url.query.url);
//
//   //initialize HTTP Client
//   var p_client = http.createClient(p_url.port || 80, p_url.hostname);
//   //send request
//   var p_req = p_client.request('GET', p_url.pathname || '/', {
//     host: p_url.hostname
//   });
//   p_req.end();
//
//   //listener for response
//   p_req.addListner('response', function(p_res){
//     b_res.writeHead(p_res.statusCode, p_res.headers);
//
//     //Pass thru data
//     p_res.addListener('data', function(chunk){
//       b_res.write(chunk)
//     });
//
//     //End request
//     p_res.addListener('end', function() {
//       b_res.end();
//     })
//   })
// }).listen(3000, "127.0.0.1");
//
// console.log("Server running at http://127.0.0.1/")

//*******************************

var index = require('./routes/index');
var users = require('./routes/users');

var cors = require('cors')
var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
