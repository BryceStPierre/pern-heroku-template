// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React app.
if (ENV === 'production') 
  app.use(express.static(path.join(__dirname, '../client/build')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  });
}

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

var db = require('./database');
db.query('SELECT NOW()', (res) => {
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});

app.listen(PORT, () => { 
  console.log(`Server listening on port ${PORT}...`); 
});

module.exports = app;
