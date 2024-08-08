import express from "express";
import {
  createCard,
  getCard,
  updateCard,
  deleteCard,
  toggleWatchCard,
} from "#src/http/controllers/card.controller.js";
import { CREATE_RULES, UPDATE_RULES } from "#src/http/rules/card.rule.js";
import validateRequest from "#src/http/middlewares/validateRequest.js";
const router = express.Router();

router.route("/").post(validateRequest(CREATE_RULES), createCard);

router
  .route("/:identify")
  .get(getCard)
  .patch(validateRequest(UPDATE_RULES), updateCard)
  .delete(deleteCard);

router.route("/:identify/watch").patch(toggleWatchCard);

export default router;
