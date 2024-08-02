const { check } = require("express-validator");

const User = require("@models/user.model");

module.exports = () => [
  check("username", "Username is empty").notEmpty(),
  check("username", "Username must be string").isString(),
  check(
    "username",
    "Username must be a string with minimum length of 4 and maximum length of 32"
  ).isLength({
    min: 4,
    max: 32,
  }),
  check("username").custom(async (value) => {
    const user = await User.findOne({
      username: value,
    });

    if (user) {
      throw new Error("Username is already taken");
    }
    return true;
  }),

  check("password", "Password is empty").notEmpty(),
  check("password", "Password must be string").isString(),
  check(
    "password",
    "Password must be a string with minimum length of 4 and maximum length of 20"
  ).isLength({
    min: 4,
    max: 20,
  }),

  check("confirmPassword", "Confirm Password is empty").notEmpty(),
  check("confirmPassword", "Confirm Password must be string").isString(),
  check("confirmPassword", "Confirm Password isn't match").custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
];
