const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (payload, expiresIn = "7d") => {
    return jwt.sign(payload, process.env.SECRET_JWT_TOKEN, {
      expiresIn,
    });
  },

  verifyToken: (token) => {
    return jwt.verify(token, process.env.SECRET_JWT_TOKEN);
  },
};
