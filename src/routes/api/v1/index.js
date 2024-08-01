var express = require("express");
var router = express.Router();

/**
 * Controllers
 */

/**
 * Routes
 */
const authRouter = require("./auth");
const usersRouter = require("./users");

router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;
