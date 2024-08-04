import express from "express";
import mongoose from "mongoose";
import path from "path";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

// var createError = require("http-errors");
// var cookieParser = require("cookie-parser");

import apiRouter from "#src/routes/v1/index";

dotenv.config();
const app = express();
const __dirname = process.cwd();
app.use(cors());

// view engine setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "resources/views"));

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Api version 1
app.use("/api/v1", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(3);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("errors/error");
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => {
    console.log("Connect to MongoDB failed");
    console.log(err);
  });

export default app;
