import express from "express";
const router = express.Router();

import AuthRouter from "./auth.js";
import TaskRouter from "./tasks.js";

router.use("/auth", AuthRouter);
router.use("/tasks", TaskRouter);

export default router;
