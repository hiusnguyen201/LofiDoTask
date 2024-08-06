import express from "express";
const router = express.Router();

import validateRequest from "#src/http/middlewares/validateRequest.js";
import {
  login,
  register,
  logout,
  refreshToken,
} from "#src/http/controllers/auth.controller.js";
import { LOGIN_RULES, REGISTER_RULES } from "#src/http/rules/auth.rule.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.post("/login", validateRequest(LOGIN_RULES), login);

router.post("/register", validateRequest(REGISTER_RULES), register);

router.post("/refresh-token", refreshToken);

router.post("/logout", isAuthorized, logout);

export default router;
