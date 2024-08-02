const { validationResult } = require("express-validator");

const User = require("../../../../models/user.model");
const { loginView } = require("../../../../config/views");
const { loginRoute, registerRoute } = require("../../../../config/routes");
const { getSession, setSessions } = require("../../../../utils/session");
const { getError } = require("../../../../utils/validate");
const { compareHash } = require("../../../../utils/bcrypt");
const { makeToken } = require("../../../../utils/jwt");

module.exports = {
  loginPage: (req, res) => {
    return res.render(loginView.path, {
      layout: loginView.layout,
      title: process.env.PROJECT_NAME + " | Sign In",
      registerRoute,
      message: getSession(req, "message"),
      oldValues: getSession(req, "oldValues") || {},
      errors: getSession(req, "errors") || [],
      getError,
    });
  },

  handleLogin: async (req, res) => {
    // Handle validate error
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
      return res.redirect(loginRoute);
    }

    // Check user
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user || !compareHash(req.body.password, user.password)) {
      setSessions({
        message: {
          type: "danger",
          text: "Username or Password isn't correct",
        },
        oldValues: req.body,
      });
      return res.redirect(loginRoute);
    }

    // Handle logic
    const { token, exp } = makeToken({
      id: user._id,
    });

    res.cookie("token", token, { maxAge: exp, httpOnly: true });
    return res.redirect("/");
  },
};
