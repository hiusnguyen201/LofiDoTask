import responseCode from "#src/constants/responseCode.constant.js";
import boardService from "./board.service.js";
import List from "#src/models/list.model.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  toggleWatch,
};

const SELECTED_FIELDS =
  "_id board name isWatched position createdAt updatedAt";

/**
 * Get all lists
 * @param {*} boardId
 * @param {*} selectFields
 * @returns
 */
async function getAll(boardId, selectFields = null) {
  if (selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  const filter = {
    board: boardId,
  };

  return List.find(filter)
    .select(selectFields)
    .sort({
      position: "asc",
    })
    .exec();
}
/**
 * Get List
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

  return List.findOne(filter).select(selectFields).exec();
}

/**
 * Count list in board
 * @param {*} boardId
 * @returns
 */
async function countInBoard(boardId) {
  return await List.countDocuments({ board: boardId });
}

/**
 * Create list
 * @param {*} boardId
 * @param {*} data
 * @returns
 */
async function create(boardId, data) {
  const count = await countInBoard(boardId);
  return await List.create({
    board: boardId,
    ...data,
    position: count + 1,
  });
}

/**
 * Update list
 * @param {*} identify
 * @param {*} updateData
 * @returns
 */
async function update(identify, updateData) {
  const list = await getOne(identify);
  if (!list) {
    throw ApiErrorUtils.simple(responseCode.LIST.LIST_NOT_FOUND);
  }

  return List.findByIdAndUpdate(list._id, updateData, {
    new: true,
  });
}

/**
 * Delete list
 * @param {*} identify
 * @returns
 */
async function remove(identify) {
  const list = await getOne(identify);
  if (!list) {
    throw ApiErrorUtils.simple(responseCode.LIST.LIST_NOT_FOUND);
  }

  return List.findByIdAndDelete(list._id);
}

/**
 * Watch / Unwatch list
 * @param {*} identify
 * @returns
 */
async function toggleWatch(identify) {
  const list = await getOne(identify);
  if (!list) {
    throw ApiErrorUtils.simple(responseCode.LIST.LIST_NOT_FOUND);
  }

  return List.findByIdAndUpdate(
    list._id,
    {
      isWatched: !list.isWatched,
    },
    { new: true }
  );
}
