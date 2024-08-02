var express = require("express");
var router = express.Router();

const UserController = require("@/http/controllers/api/v1/user.controller");

router.get("/", UserController.getAll);

module.exports = router;
