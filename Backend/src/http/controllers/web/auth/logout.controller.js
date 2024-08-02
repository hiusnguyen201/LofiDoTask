const { loginRoute } = require("@root/config/routes");

module.exports = {
  handleLogout: (req, res) => {
    res.clearCookie("token");
    return res.redirect(loginRoute);
  },
};
