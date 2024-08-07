import express from "express";

import {
  getBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  starBoard,
  removeStarBoard,
  closeBoard,
  openBoard,
} from "#src/http/controllers/board.controller.js";
import { CREATE_RULES, UPDATE_RULES } from "#src/http/rules/board.rule.js";
import validateRequest from "#src/http/middlewares/validateRequest.js";

const router = express.Router();

router
  .route("/")
  .get(getBoards)
  .post(validateRequest(CREATE_RULES), createBoard);

router
  .route("/:identify")
  .get(getBoard)
  .patch(validateRequest(UPDATE_RULES), updateBoard)
  .delete(deleteBoard);

router.route("/:identify/star").patch(starBoard).delete(removeStarBoard);

router.route("/:identify/close").patch(closeBoard).delete(openBoard);

export default router;
