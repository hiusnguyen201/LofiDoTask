const User = require("../../../../models/user.model");
const { loginView } = require("../../../../configs/views");
const {
  loginRoute,
  registerRoute,
} = require("../../../../configs/routes");
const { getSession } = require("../../../../utils/session");

module.exports = {
  loginPage: (req, res) => {
    return res.render(loginView.path, {
      layout: loginView.layout,
      title: "Sign In",
      registerRoute,
      message: getSession(req, "message"),
    });
  },

  handleLogin: async (req, res) => {
    return res.redirect(loginRoute);
  },
};
