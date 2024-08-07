import boardService from "#src/services/board.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getBoards = async (req, res, next) => {
  try {
    const { status = null, sortBy = null } = req.query;

    const dataFilter = getDataFilter(status);
    const dataSort = getDataSort(sortBy);

    const boards = await boardService.getAllWithSort(dataSort, dataFilter);

    if (boards && boards.length > 0) {
      ResponseUtils.status200(res, "Get all boards successfully !", {
        count: boards.length,
        boards,
      });
    } else {
      ResponseUtils.status200(res, "No boards found !", []);
    }
  } catch (err) {
    next(err);
  }
};

function getDataFilter(status) {
  switch (status) {
    case "close":
      return { isClosed: { $eq: true } };
    case "all":
      return {};
    default:
      return { isClosed: { $eq: false } };
  }
}

function getDataSort(sort) {
  switch (sort) {
    case "starred":
      return {
        isStarred: "desc",
        starredAt: "asc",
        createdAt: "asc",
      };
    default:
      return {
        createdAt: "asc",
      };
  }
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

    if (updatedBoard) {
      ResponseUtils.status200(res, "Update board successfully !", {
        updatedBoard,
      });
    } else {
      ResponseUtils.status404(res, "Board not found !");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const status = await boardService.remove(req.user._id, identify);
    if (status) {
      ResponseUtils.status200(res, "Delete board successfully !", {
        status,
      });
    } else {
      ResponseUtils.status404(res, "Board not found !");
    }
  } catch (err) {
    next(err);
  }
};

export const starBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedBoard = await boardService.star(req.user._id, identify);

    if (updatedBoard) {
      ResponseUtils.status200(res, "Star board successfully !", {
        board: updatedBoard,
      });
    } else {
      ResponseUtils.status404(res, "Board not found !");
    }
  } catch (err) {
    next(err);
  }
};

export const removeStarBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedBoard = await boardService.unStar(req.user._id, identify);

    if (updatedBoard) {
      ResponseUtils.status200(res, "Remove star board successfully !", {
        board: updatedBoard,
      });
    } else {
      ResponseUtils.status404(res, "Board not found !");
    }
  } catch (err) {
    next(err);
  }
};

export const closeBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedBoard = await boardService.close(req.user._id, identify);

    if (updatedBoard) {
      ResponseUtils.status200(res, "Close board successfully !", {
        board: updatedBoard,
      });
    } else {
      ResponseUtils.status404(res, "Board not found !");
    }
  } catch (err) {
    next(err);
  }
};

export const openBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedBoard = await boardService.open(req.user._id, identify);

    if (updatedBoard) {
      ResponseUtils.status200(res, "Open board successfully !", {
        board: updatedBoard,
      });
    } else {
      ResponseUtils.status404(res, "Board not found !");
    }
  } catch (err) {
    next(err);
  }
};
