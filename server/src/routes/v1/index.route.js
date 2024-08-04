import express from "express";
const router = express.Router();

import AuthRouter from "./auth.route.js";
import TaskRouter from "./tasks.route.js";

router.use("/auth", AuthRouter);
router.use("/tasks", TaskRouter);

export default router;
