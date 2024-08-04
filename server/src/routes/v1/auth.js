import express from "express";
const router = express.Router();

import {
  login,
  register,
  logout,
} from "#src/http/controllers/auth.controller";

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

export default router;
