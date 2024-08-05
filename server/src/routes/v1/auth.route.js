import express from "express";
const router = express.Router();

import {
  login,
  register,
  logout,
} from "#src/http/controllers/auth.controller.js";
import validateRequest from "#src/http/middlewares/validateRequest.js";
import { LOGIN_RULES } from "#src/http/rules/auth.rule.js";

router.post("/login", validateRequest(LOGIN_RULES), login);

router.post("/register", register);

router.post("/logout", logout);

export default router;
