import responseCode from "#src/constants/responseCode.constant.js";
import Board from "#src/models/board.model.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import StringUtils from "#src/utils/StringUtils.js";

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};

const SELECTED_FIELDS =
  "_id name code isClosed visibilityStatus prioritizedAt createdAt updatedAt";

/**
 * Get all boards
 * @param {*} filter
 * @returns
 */
async function getAll(filter) {
  const boards = await Board.find(filter);
  return boards;
}

/**
 * Get board
 * @param {*} identify - find by _id or code
 * @returns
 */
async function getOne(userId, identify, selectFields = null) {
  const filter = StringUtils.isUUID(identify)
    ? { _id: identify }
    : { code: identify };

  if (selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  filter.user = userId;
  const board = await Board.findOne(filter).select(selectFields);
  return board;
}

/**
 * Create board
 * @param {*} userId
 * @param {*} data
 * @returns
 */
async function create(userId, data) {
  const code = StringUtils.generateNanoID();

  const board = await Board.create({
    user: userId,
    ...data,
    code,
  });
  return board;
}

/**
 * Update board
 * @param {*} userId
 * @param {*} identify - find by _id or code
 * @param {*} updateData
 * @returns
 */
async function update(userId, identify, updateData) {
  const board = await getOne(userId, identify);

  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  const updatedBoard = await Board.findByIdAndUpdate(
    board?._id,
    updateData,
    {
      new: true,
    }
  );

  return updatedBoard;
}

/**
 * Delete board
 * @param {*} userId
 * @param {*} identify - find by _id or code
 * @returns
 */
async function remove(userId, identify) {
  const board = await getOne(userId, identify);
  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  const status = await Board.findByIdAndDelete(board._id);
  return !!status;
}
