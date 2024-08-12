import express from "express";
const router = express.Router();

import authRouter from "./auth.route.js";
import boardRouter from "./board.route.js";
import listRouter from "./list.route.js";
import cardRouter from "./card.route.js";
import accountRouter from "./account.route.js";
import { isAuthorized } from "#src/http/middlewares/jwtAuth.js";

router.use("/auth", authRouter);
router.use("/boards", isAuthorized, boardRouter);
router.use("/lists", isAuthorized, listRouter);
router.use("/cards", isAuthorized, cardRouter);
router.use("/account", isAuthorized, accountRouter);

export default router;
