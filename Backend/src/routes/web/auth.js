var express = require("express");
var router = express.Router();

const LoginController = require("@controllers/web/auth/login.controller");
const RegisterController = require("@controllers/web/auth/register.controller");
const LogoutController = require("@controllers/web/auth/logout.controller");

const LoginRequest = require("@requests/auth/login.request");
const RegisterRequest = require("@requests/auth/register.request");

const GuestMiddleware = require("@middlewares/guest.middleware");
const AuthMiddleware = require("@middlewares/auth.middleware");

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
