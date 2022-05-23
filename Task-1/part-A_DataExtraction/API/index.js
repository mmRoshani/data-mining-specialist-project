var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const config = require("./config/db");
const cors = require("cors");
require("dotenv").config();
var indexRouter = require("./Controllers/index.Contoller");
var categoryRouter = require("./Controllers/Category.Contoller/categories.Contoller");

var app = express();
const port = process.env.PORT || 4000;
app.use(cors());

// Set Up database
mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "**Error> MongoDB connection error:")
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Router
app.use("/", indexRouter);
app.use("/category", categoryRouter);

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
