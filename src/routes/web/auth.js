var express = require("express");
var router = express.Router();

const LoginController = require("../../http/controllers/web/auth/login.controller");
const RegisterController = require("../../http/controllers/web/auth/register.controller");

const LoginRequest = require("../../http/requests/auth/login.request");
const RegisterRequest = require("../../http/requests/auth/register.request");

/**
 * Prefix: /auth
 */

router.get("/login", LoginController.loginPage);
router.post("/login", LoginRequest(), LoginController.handleLogin);

router.get("/register", RegisterController.registerPage);
router.post(
  "/register",
  RegisterRequest(),
  RegisterController.handleRegister
);

module.exports = router;
