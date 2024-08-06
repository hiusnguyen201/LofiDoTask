import express from "express";
const router = express.Router();

import AuthRouter from "./auth.route.js";
import BoardRouter from "./board.route.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.use("/auth", AuthRouter);
router.use("/boards", isAuthorized, BoardRouter);

export default router;
