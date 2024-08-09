import responseCode from "#src/constants/responseCode.constant.js";
import Card from "#src/models/card.model.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import StringUtils from "#src/utils/StringUtils.js";

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  toggleWatch,
};

const SELECTED_FIELDS =
  "_id list name description isWatched position createdAt updatedAt";

/**
 * Get all cards
 * @param {*} listId
 * @param {*} selectFields
 * @returns
 */
async function getAll(listId, selectFields = null) {
  if (selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  const filter = {
    list: listId,
  };

  return Card.find(filter).select(selectFields).exec();
}

/**
 * Get card
 * @param {*} identify
 * @param {*} selectFields
 * @returns
 */
async function getOne(identify, selectFields = null) {
  if (selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  const filter = {
    _id: identify,
  };

  return Card.findOne(filter).select(selectFields).exec();
}

/**
 * Count card in list
 * @param {*} listId
 * @returns
 */
async function countInList(listId) {
  return await Card.countDocuments({ list: listId });
}

/**
 * Create card
 * @param {*} listId
 * @param {*} data
 * @returns
 */
async function create(listId, data) {
  const count = await countInList(listId);
  return await Card.create({
    list: listId,
    ...data,
    position: count + 1,
  });
}

/**
 * Update card
 * @param {*} identify
 * @param {*} updateData
 * @returns
 */
async function update(identify, updateData) {
  const card = await getOne(identify);
  if (!card) {
    throw ApiErrorUtils.simple(responseCode.CARD.CARD_NOT_FOUND);
  }

  return Card.findByIdAndUpdate(card._id, updateData, {
    new: true,
  });
}

/**
 * Delete card
 * @param {*} identify
 * @returns
 */
async function remove(identify) {
  const card = await getOne(identify);
  if (!card) {
    throw ApiErrorUtils.simple(responseCode.CARD.CARD_NOT_FOUND);
  }

  return Card.findByIdAndDelete(card._id);
}

/**
 * Watch / Unwatch card
 * @param {*} identify
 * @returns
 */
async function toggleWatch(identify) {
  const card = await getOne(identify);
  if (!card) {
    throw ApiErrorUtils.simple(responseCode.CARD.CARD_NOT_FOUND);
  }

  return Card.findByIdAndUpdate(
    card._id,
    {
      isWatched: !card.isWatched,
    },
    { new: true }
  );
}
