import express from "express";
const router = express.Router();

import validateRequest from "#src/http/middlewares/validateRequest.js";
import {
  login,
  register,
  refreshToken,
  logout,
} from "#src/http/controllers/auth.controller.js";
import {
  LOGIN_RULES,
  REGISTER_RULES,
  REFRESH_TOKEN_RULES,
} from "#src/http/rules/auth.rule.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.route("/login").post(validateRequest(LOGIN_RULES), login);

router.route("/register").post(validateRequest(REGISTER_RULES), register);

router
  .route("/refresh-token")
  .post(validateRequest(REFRESH_TOKEN_RULES), refreshToken);

router.route("/logout").post(isAuthorized, logout);

export default router;
