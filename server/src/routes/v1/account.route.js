import express from "express";

import { getInfo } from "#src/http/controllers/account.controller.js";
import { getBoardsInUser } from "#src/http/controllers/board.controller.js";

const router = express.Router();

router.route("/info").get(getInfo);
router.route("/boards").get(getBoardsInUser);

export default router;
