var express = require("express");
var router = express.Router();

const UserController = require("@apiControllers/v1/user.controller");

router.get("/", UserController.getUsers);

module.exports = router;
