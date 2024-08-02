const jwt = require("jsonwebtoken");

module.exports = {
  makeToken: (data) => {
    const exp =
      Math.floor(Date.now() / 1000) +
      60 * 60 * +process.env.EXPIRY_HOURS_OF_ACCESS_TOKEN;
    const token = jwt.sign(
      {
        exp,
        data,
      },
      process.env.SECRET_ACCESS_TOKEN
    );

    return { token, exp };
  },

  getDateToken: (token) => {
    try {
      return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    } catch (e) {
      return null;
    }
  },
};
