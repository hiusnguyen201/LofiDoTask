import boardService from "#src/services/board.service.js";
import listService from "#src/services/list.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getBoardsInUser = async (req, res, next) => {
  try {
    const { sortBy = "", status = "" } = req.query;

    const dataFilter = getDataFilter({ status });
    const dataSort = getDataSort(sortBy);

    const boards = await boardService.getAllWithSortInUser(
      req.user._id,
      dataSort,
      dataFilter
    );

    if (boards && boards.length > 0) {
      ResponseUtils.status200(res, "Get all boards successfully !", {
        count: boards.length,
        boards,
      });
    } else {
      ResponseUtils.status200(res, "No boards found !", {
        count: 0,
        boards: [],
      });
    }
  } catch (err) {
    next(err);
  }
};

function getDataFilter({ status = "" }) {
  let filter = {};

  switch (status) {
    case "close":
      filter.isClosed = { $eq: true };
      break;
    case "all":
      break;
    default:
      filter.isClosed = { $eq: false };
      break;
  }
}

function getDataSort(sortStr) {
  const types = sortStr.split(",");
  const sortBy = {};

  if (types.includes("starred")) sortBy.isStarred = "desc";

  types.map((type) => {
    const [order = "asc", field] = type.split("");
    sortBy[field] = order === "-" ? "desc" : "asc";
  });

  return sortBy;
}

export const getBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const board = await boardService.getOne(req.user._id, identify);

    if (board) {
      ResponseUtils.status200(res, "Get board successfully !", { board });
    } else {
      ResponseUtils.status404(res, `Board with "${identify}" not found !`);
    }
  } catch (err) {
    next(err);
  }
};

export const createBoard = async (req, res, next) => {
  try {
    const board = await boardService.create(req.user._id, req.body);

    if (!board) {
      throw new Error("Create board failed");
    }

    ResponseUtils.status201(res, "Create board successfully !", { board });
  } catch (err) {
    next(err);
  }
};

export const updateBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedBoard = await boardService.update(
      req.user._id,
      identify,
      req.body
    );

    if (!updatedBoard) {
      throw new Error("Update board failed !");
    }

    ResponseUtils.status200(res, "Update board successfully !", {
      board: updatedBoard,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const result = await boardService.remove(req.user._id, identify);

    if (!result) {
      throw new Error("Delete board failed !");
    }

    ResponseUtils.status200(res, "Delete board successfully !", {
      status: !!result,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleStarBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedBoard = await boardService.toggleStar(
      req.user._id,
      identify
    );

    if (!updatedBoard) {
      throw new Error("Interact with star board failed !");
    }

    ResponseUtils.status200(
      res,
      `${
        updatedBoard.starredAt ? "Star" : "Remove star"
      } board successfully !`,
      {
        board: updatedBoard,
      }
    );
  } catch (err) {
    next(err);
  }
};

export const toggleCloseBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedBoard = await boardService.toggleClose(
      req.user._id,
      identify
    );

    if (!updatedBoard) {
      throw new Error("Interact close board failed !");
    }

    ResponseUtils.status200(
      res,
      `${updatedBoard.isClosed ? "Close" : "Open"} board successfully !`,
      {
        board: updatedBoard,
      }
    );
  } catch (err) {
    next(err);
  }
};

export const getAllLists = async (req, res, next) => {
  try {
    const boardId = req.params.identify;
    const lists = await listService.getAll(boardId);

    if (lists && lists.length > 0) {
      ResponseUtils.status200(res, "Get all lists successfully !", {
        count: lists.length,
        lists,
      });
    } else {
      ResponseUtils.status200(res, "No lists found !", []);
    }
  } catch (err) {
    next(err);
  }
};
