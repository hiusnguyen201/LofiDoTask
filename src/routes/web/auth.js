var express = require("express");
var router = express.Router();

const AuthController = require("../../http/controllers/web/auth.controller");

/**
 * Prefix: /auth
 */
router.get("/login", AuthController.loginPage);

module.exports = router;
