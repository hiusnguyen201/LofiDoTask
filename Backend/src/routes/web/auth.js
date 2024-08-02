var express = require("express");
var router = express.Router();

const LoginController = require("../../http/controllers/web/auth/login.controller");
const RegisterController = require("../../http/controllers/web/auth/register.controller");
const LogoutController = require("../../http/controllers/web/auth/logout.controller");

const LoginRequest = require("../../http/requests/auth/login.request");
const RegisterRequest = require("../../http/requests/auth/register.request");

const GuestMiddleware = require("../../http/middlewares/guest.middleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");

/**
 * Prefix: /auth
 */
router.post("/logout", AuthMiddleware, LogoutController.handleLogout);

router.use(GuestMiddleware);
router.get("/login", LoginController.loginPage);
router.post("/login", LoginRequest(), LoginController.handleLogin);

router.get("/register", RegisterController.registerPage);
router.post(
  "/register",
  RegisterRequest(),
  RegisterController.handleRegister
);

module.exports = router;
