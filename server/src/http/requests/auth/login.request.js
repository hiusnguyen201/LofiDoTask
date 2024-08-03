const { check } = require("express-validator");

module.exports = () => [
  check("username", "Username is empty").notEmpty(),
  check("username", "Username must be string").isString(),

  check("password", "Password is empty").notEmpty(),
  check("password", "Password must be string").isString(),
];
