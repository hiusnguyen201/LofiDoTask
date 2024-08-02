const User = require("@models/user.model");

const { homeRoute } = require("@config/routes");

const { getDateToken } = require("@utils/jwt");

module.exports = async (req, res, next) => {
  if (!req.cookies?.token) {
    return next();
  }

  const result = getDateToken(req.cookies?.token);
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
