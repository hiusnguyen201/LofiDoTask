var express = require("express");
var router = express.Router();

const jobRouter = require("./jobs");

const HomeController = require("../../http/controllers/web/clients/home.controller");

/**
 * Prefix: /
 */
router.get("/", HomeController.homePage);
router.use("/jobs", jobRouter);

module.exports = router;
