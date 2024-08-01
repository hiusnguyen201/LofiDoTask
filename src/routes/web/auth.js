var express = require("express");
var router = express.Router();

const AuthController = require("../../controllers/web/auth.controller");

/**
 * Prefix: /auth
 */
router.use("/auth", () => {});
router.get("/login", AuthController.loginPage);

module.exports = router;
