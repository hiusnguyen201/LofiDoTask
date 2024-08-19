import express from "express";

import {
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  toggleStarBoard,
  toggleCloseBoard,
  getAllLists,
} from "#src/http/controllers/board.controller.js";
import { CREATE_RULES, UPDATE_RULES } from "#src/http/rules/board.rule.js";
import validateRequest from "#src/http/middlewares/validateRequest.js";

const router = express.Router();

router.route("/").post(validateRequest(CREATE_RULES), createBoard);

router
  .route("/:identify")
  .get(getBoard)
  .patch(validateRequest(UPDATE_RULES), updateBoard)
  .delete(deleteBoard);

router.route("/:identify/star").patch(toggleStarBoard);

router.route("/:identify/close").patch(toggleCloseBoard);

router.route("/:identify/lists").get(getAllLists);

export default router;
