import boardService from "#src/services/board.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getAll();

    if (boards && boards.length > 0) {
      ResponseUtils.status200(
        res,
        "Get all boards successfully !",
        boards
      );
    } else {
      ResponseUtils.status200(res, "No boards found !", []);
    }
  } catch (err) {
    next(err);
  }
};

export const getBoard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const board = await boardService.getOne(req.user._id, identify);

    if (board) {
      ResponseUtils.status200(res, "Get board successfully !", board);
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

    ResponseUtils.status201(res, "Create board successfully !", board);
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
      ResponseUtils.status200(
        res,
        "Update board successfully !",
        updatedBoard
      );
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
