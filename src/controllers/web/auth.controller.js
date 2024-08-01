const VIEW_PATHS = require("../../configs/views");

module.exports = {
  loginPage: (req, res) => {
    return res.view(VIEW_PATHS.LOGIN_PATH);
  },
};
