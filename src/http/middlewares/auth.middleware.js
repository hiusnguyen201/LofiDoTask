const User = require("../../models/user.model");
const { verifyToken } = require("../../utils/jwt");
const { loginRoute } = require("../../config/routes");

module.exports = async (req, res, next) => {
  if (!req.cookies?.token) {
    return res.redirect(loginRoute);
  }

  const result = verifyToken(req.cookies?.token);
  if (!result || !result?.data) {
    res.clearCookie("token");
    return res.redirect(loginRoute);
  }

  const user = await User.findOne({
    _id: result.data?.id,
  });

  if (!user) {
    res.clearCookie("token");
    return res.redirect(loginRoute);
  }

  return next();
};
