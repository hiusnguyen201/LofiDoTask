import express from "express";
const router = express.Router();

import AuthRouter from "./auth.route.js";
import TaskRouter from "./tasks.route.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.use("/auth", AuthRouter);
router.use("/tasks", isAuthorized, TaskRouter);

export default router;
