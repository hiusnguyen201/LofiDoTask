const bcrypt = require("bcrypt");

module.exports = {
  makeHash: (value) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(value, salt);
  },

  compareHash: (value, hash) => {
    return bcrypt.compareSync(value, hash);
  },
};
