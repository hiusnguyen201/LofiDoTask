const User = require("@models/user.model");
const ResponseUtil = require("@utils/response.util");

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find();

    ResponseUtil.status200;
    return res.status(200).json({
      data: users,
    });
  },
};
