var express = require("express");
var router = express.Router();

const taskRouter = require("./tasks");

const HomeController = require("@controllers/web/clients/home.controller");

/**
 * Prefix: /
 */
router.get("/", HomeController.homePage);
router.use("/tasks", taskRouter);

module.exports = router;
