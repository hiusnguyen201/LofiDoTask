var express = require("express");
var router = express.Router();

const TaskController = require("../../http/controllers/web/clients/task.controller");

/**
 * Prefix: /jobs
 */
router.post("/add", TaskController.handleAdd);
router.post("/edit", TaskController.handleEdit);
router.post("/delete", TaskController.handleDelete);

module.exports = router;
