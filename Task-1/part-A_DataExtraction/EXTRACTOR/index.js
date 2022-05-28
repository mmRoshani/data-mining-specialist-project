let cors = require("cors");
let express = require("express");
let mongoose = require("mongoose");
let createError = require("http-errors");
const swaggerSpec = require("./swagger.config");
let swaggerUi = require("swagger-ui-express");
let logger = require("morgan");
const config = require("./config/db.config");
let indexRouter = require("./Controllers/index.Controller");
let categoryRouter = require("./Controllers/Category.Controller/categories.Controller");
let consumer = require("./messaging/consumer.messaging");
let publisherEnum = require("./DataStructures/publisher.enum");

const app = express();

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
app.use(cors());

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ status: 500, error: "Internal server error" });
});

/**
 *
 * INITIAL CONSUMERS
 *
 */

const port = 4500;
app.listen(port, async () => {
  console.log(`Extractor server listen on port ${port}`);
  await consumer(publisherEnum.QUEUE_PRODUCT);
  await consumer(publisherEnum.QUEUE_COMMENT);
  await consumer(publisherEnum.QUEUE_ALL_COMMENT_SUB_CATEGORY);
});
