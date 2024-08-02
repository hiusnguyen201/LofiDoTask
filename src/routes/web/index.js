var express = require("express");
var router = express.Router();

const AuthMiddleware = require("../../http/middlewares/auth.middleware");

const authRouter = require("./auth");
const homeRouter = require("./home");

router.use("/auth", authRouter);

router.use("/", AuthMiddleware, homeRouter);

module.exports = router;
