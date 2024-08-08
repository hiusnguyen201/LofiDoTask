import listService from "#src/services/list.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getList = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const list = await listService.getOne(identify);

    if (list) {
      ResponseUtils.status200(res, "Get list successfully !", { list });
    } else {
      ResponseUtils.status404(res, `List with "${identify}" not found !`);
    }
  } catch (err) {
    next(err);
  }
};

export const createList = async (req, res, next) => {
  try {
    const boardId = req.body.boardId;
    const list = await listService.create(boardId, req.body);

    if (!list) {
      throw new Error("Create list failed");
    }

    ResponseUtils.status201(res, "Create list successfully !", { list });
  } catch (err) {
    next(err);
  }
};

export const updateList = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedList = await listService.update(identify, req.body);

    if (!updatedList) {
      throw new Error("Update list failed !");
    }

    ResponseUtils.status200(res, "Update list successfully !", {
      list: updatedList,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const result = await listService.remove(identify);

    if (!result) {
      throw new Error("Delete list failed !");
    }

    ResponseUtils.status200(res, "Delete list successfully !", {
      status: !!result,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleWatchList = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedList = await listService.toggleWatch(identify);

    if (!updatedList) {
      throw new Error("Interact with watch list failed !");
    }

    ResponseUtils.status200(
      res,
      `${updatedList.isWatched ? "Watch" : "Unwatch"} list successfully !`,
      {
        list: updatedList,
      }
    );
  } catch (err) {
    next(err);
  }
};
