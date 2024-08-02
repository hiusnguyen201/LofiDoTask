const { loginRoute } = require("@config/routes");

module.exports = {
  handleLogout: (req, res) => {
    res.clearCookie("token");
    return res.redirect(loginRoute);
  },
};
