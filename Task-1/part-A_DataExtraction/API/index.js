let createError = require("http-errors");
let express = require("express");
let path = require("path");
let logger = require("morgan");
let mongoose = require("mongoose");
const config = require("./config/db.config");
let swaggerSpec = require("./swagger.config")
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
require("dotenv").config();
let indexRouter = require("./Controllers/index.Controller");
let categoryRouter = require("./Controllers/Category.Controller/categories.Controller");

let app = express();
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


app.use("/", indexRouter);

app.use("/category", categoryRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
