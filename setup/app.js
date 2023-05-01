var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/users", (req, res, next) => { 
  return res.send("USERS: Received a GET HTTP method"); 
}); 

app.post("/users", (req, res, next) => { 
  return res.send("USERS: Received a POST HTTP method"); 
}); 

app.put("/users/:userId", (req, res) => { 
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`
  );  
}); 

app.delete("/users/:userId", (req, res, next) => { 
  return res.send( 
    `DELETE HTTP method on user/${req.params.userId} resource` 
  ); 
});

app.put("/users", (req, res, next) => { 
  return res.send("USERS: Received a PUT HTTP method");
}); 

app.delete("/users", (req, res, next) => { 
  return res.send("USERS: Received a DELETE HTTP method");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
