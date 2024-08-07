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
  toggleStar,
  toggleClose,
};

const SELECTED_FIELDS =
  "_id name sku isClosed visibilityStatus starredAt createdAt updatedAt";

/**
 * Get all boards
 * @param {*} filter
 * @returns
 */
async function getAll(filter, selectedFields = null) {
  if (!selectedFields) {
    selectedFields = SELECTED_FIELDS;
  }

  return Board.find(filter).select(selectedFields).exec();
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

  return Board.aggregate([
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
    .project(selectedFields)
    .exec();
}

/**
 * Get board
 * @param {*} identify - find by _id or sku
 * @returns
 */
async function getOne(userId, identify, selectFields = null) {
  const filter = StringUtils.isUUID(identify)
    ? { _id: identify }
    : { sku: identify };

  if (selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  filter.user = userId;

  return Board.findOne(filter).select(selectFields).exec();
}

/**
 * Create board
 * @param {*} userId
 * @param {*} data
 * @returns
 */
async function create(userId, data) {
  const sku = StringUtils.generateNanoID();

  return await Board.create({
    user: userId,
    ...data,
    sku,
  });
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

  return Board.findByIdAndUpdate(board?._id, updateData, {
    new: true,
  });
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

  return Board.findByIdAndDelete(board._id);
}

/**
 * Star / UnStar board
 * @param {*} userId
 * @param {*} identify
 * @returns
 */
async function toggleStar(userId, identify) {
  const board = await getOne(userId, identify);
  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  return Board.findByIdAndUpdate(
    board._id,
    {
      isStarred: board.isStarred ? null : Date.now(),
    },
    { new: true }
  );
}

/**
 * Close / Open board
 * @param {*} userId
 * @param {*} identify
 * @returns
 */
async function toggleClose(userId, identify) {
  const board = await getOne(userId, identify);
  if (!board) {
    throw ApiErrorUtils.simple(responseCode.BOARD.BOARD_NOT_FOUND);
  }

  return Board.findByIdAndUpdate(
    board._id,
    {
      isClosed: !board.isClosed,
    },
    { new: true }
  );
}
