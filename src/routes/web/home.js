var express = require("express");
var router = express.Router();

const HomeController = require("../../http/controllers/web/clients/home.controller");

/**
 * Prefix: /
 */
router.get("/", HomeController.homePage);

module.exports = router;
