import User from "#src/models/user.model.js";
import StringUtils from "#src/utils/StringUtils.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";

export default {
  create,
  getOne,
};

const SELECTED_FIELDS = "_id username createdAt updatedAt";

/**
 * Create user
 * @param {*} data - object data
 * @returns
 */
async function create(data) {
  const hash = BcryptUtils.makeHash(data.password);
  const user = await User.create({
    ...data,
    password: hash,
  });
  return user;
}

/**
 * Get user
 * @param {*} identify - find by _id or username
 * @param {*} selectFields
 * @returns
 */
async function getOne(identify, selectFields = null) {
  const filter = {};

  if (!selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  if (selectFields.includes("*")) {
    selectFields = selectFields.replace("*", SELECTED_FIELDS);
  }

  if (StringUtils.isUUID(identify)) {
    filter._id = identify;
  } else if (StringUtils.isEmailAddress(identify)) {
    filter.email = identify;
  } else {
    filter.username = identify;
  }

  return await User.findOne(filter).select(selectFields);
}
