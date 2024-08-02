const { verifyToken } = require("../../utils/jwt");
const User = require("../../models/user.model");
const { homeRoute } = require("../../config/routes");

module.exports = async (req, res, next) => {
  if (!req.cookies?.token) {
    return next();
  }

  const result = verifyToken(req.cookies?.token);
  if (!result || !result?.data) {
    res.clearCookie("token");
    return next();
  }

  const user = await User.findOne({
    _id: result.data?.id,
  });

  if (user) {
    return res.redirect(homeRoute);
  }

  res.clearCookie("token");
  return next();
};
