require("dotenv").config();
require("module-alias/register");

var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");

// Connect db
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.log(err);
  }
}

connectDB();

const webRouter = require("./routes/web/index");
const apiRouter = require("./routes/api/v1/index");

var app = express();
app.disable("etag");
app.use(cors());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "todoist",
    resave: false,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources/views"));
app.set("layout", false);
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", webRouter);
// Api version 1
app.use("/api/v1", apiRouter);

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
  res.render("errors/error");
});

module.exports = app;
