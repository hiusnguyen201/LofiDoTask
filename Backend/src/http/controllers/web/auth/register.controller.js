const { validationResult } = require("express-validator");

const User = require("@models/user.model");

const { registerView } = require("@config/views");
const { loginRoute, registerRoute } = require("@config/routes");

const { getError } = require("@utils/validate");
const { makeHash } = require("@utils/bcrypt");
const { getSession, setSessions } = require("@utils/session");

module.exports = {
  registerPage: (req, res) => {
    return res.render(registerView.path, {
      layout: registerView.layout,
      loginRoute,
      title: process.env.PROJECT_NAME + " | Sign Up",
      getError,
      errors: getSession(req, "errors") || [],
      message: getSession(req, "message"),
      oldValues: getSession(req, "oldValues") || {},
    });
  },

  handleRegister: async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      setSessions(req, {
        errors: result.array({
          onlyFirstError: true,
        }),
        message: {
          type: "danger",
          text: "Invalid information!",
        },
        oldValues: req.body,
      });

      return res.redirect(registerRoute);
    }

    try {
      await User.create({
        ...req.body,
        password: makeHash(req.body.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setSessions(req, {
        message: {
          type: "success",
          text: "Register successful!",
        },
      });
      return res.redirect(loginRoute);
    } catch (err) {
      console.log(err.message);
      setSessions(req, {
        message: {
          type: "danger",
          text: "Register failed!",
        },
      });
      return res.redirect(registerRoute);
    }
  },
};
