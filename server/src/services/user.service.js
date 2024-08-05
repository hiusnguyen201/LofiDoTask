import * as uuid from "uuid";
import User from "#src/models/user.model.js";
import CypherUtils from "#src/utils/CypherUtils.js";

export default {
  create,
  getOne,
};

const selectFields = "_id username createdAt updatedAt";

/**
 * Create user
 * @param {Object} data
 * @returns
 */
async function create(data) {
  const hash = CypherUtils.makeHash(data.password);
  const user = await User.create({
    ...data,
    password: hash,
  });
  return user;
}

async function getOne(identify) {
  const filter = {};

  if (uuid.validate(identify)) {
    filter._id = identify;
  } else {
    filter.username = identify;
  }

  return await User.findOne(filter);
}
