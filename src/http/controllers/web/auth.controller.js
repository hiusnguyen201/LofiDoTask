const VIEW_PATHS = require("../../../configs/views");

module.exports = {
  loginPage: (req, res) => {
    return res.render(VIEW_PATHS.LOGIN_PATH);
  },
};
