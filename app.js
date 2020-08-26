var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// Change file .ai extension to .pdf
var fs = require('fs');
fs.rename('test_files/temp1.ai', 'test_files/temp1.pdf', function(err) {
    if ( err ) console.log('ERROR: ' + err);
});

// Convert pdf to png
var pdf2img = require('pdf-img-convert');
var outputImages1 = pdf2img.convert('test_files/temp1.pdf');
outputImages1.then(function(outputImages) {
    for (i = 0; i < outputImages.length; i++)
        fs.writeFile("test_files/temp1.png", outputImages[i], function (error) {
          if (error) { console.error("Error: " + error); }
        });
    });

// Convert .psd to .png
var PSD = require('psd');
PSD.open("test_files/temp2.psd").then(function (psd) {
  return psd.image.saveAsPng('test_files/temp2.png');
}).then(function () {
  console.log("Finished!");
});
