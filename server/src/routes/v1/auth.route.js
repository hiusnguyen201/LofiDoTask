import express from "express";
const router = express.Router();

import validateRequest from "#src/http/middlewares/validateRequest.js";
import {
  login,
  register,
  refreshToken,
  logout,
  sendOtpResetPassword,
  resetPassword,
} from "#src/http/controllers/auth.controller.js";
import {
  LOGIN_RULES,
  REGISTER_RULES,
  REFRESH_TOKEN_RULES,
  EMAIL_RESET_PASSWORD_RULES,
  RESET_PASSWORD_RULES,
} from "#src/http/rules/auth.rule.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.route("/login").post(validateRequest(LOGIN_RULES), login);

router.route("/register").post(validateRequest(REGISTER_RULES), register);

router
  .route("/send-otp-reset-password")
  .post(validateRequest(EMAIL_RESET_PASSWORD_RULES), sendOtpResetPassword);

router
  .route("/reset-password/:token")
  .post(validateRequest(RESET_PASSWORD_RULES), resetPassword);

router
  .route("/refresh-token")
  .post(validateRequest(REFRESH_TOKEN_RULES), refreshToken);

router.route("/logout").post(isAuthorized, logout);

export default router;
