const User = require("@models/user.model");

module.exports = {
  getAll: async (req, res) => {
    const users = await User.find();
    return res.status(200).json(
      {
        data: users,
      },
      200
    );
  },
};
