import express from "express";
import mongoose from "mongoose";
import path from "path";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

import error from "#src/http/middlewares/error.js";
import apiRouter from "#src/routes/v1/index.route.js";

// var createError = require("http-errors");
// var cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const __dirname = process.cwd();
app.use(cors());

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
app.use(error.handler);

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
