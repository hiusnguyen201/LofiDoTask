var express = require("express");
var router = express.Router();

const JobController = require("../../http/controllers/web/clients/job.controller");

/**
 * Prefix: /jobs
 */
router.post("/add", JobController.handleAdd);
router.post("/edit", JobController.handleEdit);
router.post("/delete", JobController.handleDelete);

module.exports = router;
