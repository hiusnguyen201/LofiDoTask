var express = require("express");
var router = express.Router();

const LoginController = require("../../http/controllers/web/auth/login.controller");
const RegisterController = require("../../http/controllers/web/auth/register.controller");

const RegisterRule = require("../../http/rules/auth/register.rule");

/**
 * Prefix: /auth
 */
router.get("/login", LoginController.loginPage);
router.post("/login", LoginController.handleLogin);

router.get("/register", RegisterController.registerPage);
router.post(
  "/register",
  RegisterRule(),
  RegisterController.handleRegister
);

module.exports = router;
