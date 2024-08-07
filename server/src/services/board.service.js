import responseCode from "#src/constants/responseCode.constant.js";
import Board from "#src/models/board.model.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import StringUtils from "#src/utils/StringUtils.js";

export default {
  getAllWithSort,
  getAll,
  getOne,
  create,
  update,
  remove,
  star,
  unStar,
  close,
  open,
};

const SELECTED_FIELDS =
  "_id name code isClosed visibilityStatus starredAt createdAt updatedAt";

/**
 * Get all boards
 * @param {*} filter
 * @returns
 */
async function getAll(filter, selectedFields = null) {
  if (!selectedFields) {
    selectedFields = SELECTED_FIELDS;
  }

  const boards = await Board.find(filter).select(selectedFields);
  return boards;
}

/**
 * Get all boards with sort
 * More fields to sort: isStarred
 * Get more details in https://mongoosejs.com/docs/api/aggregate.html
 * @param {*} sorts - Object, Sort value: asc | desc | ascending | descending
 * @param {*} filter
 * @param {*} selectedFields
 * @returns
 */
async function getAllWithSort(
  sorts = {},
  filter = {},
  selectedFields = null
) {
  if (!selectedFields) {
    const fieldsArr = SELECTED_FIELDS.split(" ");
    selectedFields = fieldsArr.reduce((curr, field) => {
      curr[field] = 1;
      return curr;
    }, {});
  }

  if (!Object.keys(sorts).length) {
    sorts.createdAt = "asc";
  }

  const boards = await Board.aggregate([
    {
      $match: filter,
    },
    {
      $addFields: {
        isStarred: {
          $cond: {
            if: {
              $gt: ["$starredAt", null],
            },
            then: 1,
            else: 0,
          },
        },
      },
    },
  ])
    .sort(sorts)
    .project(selectedFields);

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
 * @param {*} identify
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
 * @param {*} identify
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

/**
 * Star board
 * @param {*} userId
 * @param {*} identify
 * @returns
 */
async function star(userId, identify) {
  const board = await getOne(userId, identify);

  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  if (board.starredAt) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_STARRED);
  }

  board.starredAt = Date.now();

  return await board.save();
}

/**
 * Remove board
 * @param {*} userId
 * @param {*} identify
 * @returns
 */
async function unStar(userId, identify) {
  const board = await getOne(userId, identify);

  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  if (!board.starredAt) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_UNSTARRED);
  }

  board.starredAt = null;

  return await board.save();
}

/**
 * Close board
 * @param {*} userId
 * @param {*} identify
 * @returns
 */
async function close(userId, identify) {
  const board = await getOne(userId, identify);

  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  if (board.isClosed) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_CLOSED);
  }

  board.isClosed = true;

  return await board.save();
}

/**
 * Open board
 * @param {*} userId
 * @param {*} identify
 * @returns
 */
async function open(userId, identify) {
  const board = await getOne(userId, identify);

  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  if (!board.isClosed) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_OPENED);
  }

  board.isClosed = false;

  return await board.save();
}
