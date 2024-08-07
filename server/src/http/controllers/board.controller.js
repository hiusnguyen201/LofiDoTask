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

    if (!updatedBoard) {
      throw new Error("Update board failed !");
    }

    ResponseUtils.status200(res, "Update board successfully !", {
      updatedBoard,
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
