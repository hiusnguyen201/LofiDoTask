import express from "express";
import {
  createList,
  getList,
  updateList,
  deleteList,
  toggleWatchList,
} from "#src/http/controllers/list.controller.js";
import { CREATE_RULES, UPDATE_RULES } from "#src/http/rules/list.rule.js";
import validateRequest from "#src/http/middlewares/validateRequest.js";
const router = express.Router();

router.route("/").post(validateRequest(CREATE_RULES), createList);

router
  .route("/:identify")
  .get(getList)
  .patch(validateRequest(UPDATE_RULES), updateList)
  .delete(deleteList);

router.route("/:identify/watch").patch(toggleWatchList);

export default router;
