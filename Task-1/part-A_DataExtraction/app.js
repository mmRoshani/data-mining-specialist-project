var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require('mongoose');
require("dotenv").config();

var indexRouter = require("./routes/index");
var categoriesRouter = require("./routes/Category/categories");

var app = express();
const port = 4000;
// Set Up database
var mongoDB = 'mongodb://127.0.0.1/DK';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error',
    console.error.bind(console, '**Error> MongoDB connection error:'));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Router
app.use("/", indexRouter);
app.use("/categories", categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Application listening on port: ${port}`);
});

module.exports = app;
