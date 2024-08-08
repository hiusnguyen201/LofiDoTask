import cardService from "#src/services/card.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";

export const getCard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const card = await cardService.getOne(identify);

    if (card) {
      ResponseUtils.status200(res, "Get card successfully !", { card });
    } else {
      ResponseUtils.status404(res, `Card with "${identify}" not found !`);
    }
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req, res, next) => {
  try {
    const listId = req.body.listId;
    const card = await cardService.create(listId, req.body);

    if (!card) {
      throw new Error("Create card failed");
    }

    ResponseUtils.status201(res, "Create card successfully !", { card });
  } catch (err) {
    next(err);
  }
};

export const updateCard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedCard = await cardService.update(identify, req.body);

    if (!updatedCard) {
      throw new Error("Update card failed !");
    }

    ResponseUtils.status200(res, "Update card successfully !", {
      card: updatedCard,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const result = await cardService.remove(identify);

    if (!result) {
      throw new Error("Delete card failed !");
    }

    ResponseUtils.status200(res, "Delete card successfully !", {
      status: !!result,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleWatchCard = async (req, res, next) => {
  try {
    const identify = req.params.identify;
    const updatedCard = await cardService.toggleWatch(identify);

    if (!updatedCard) {
      throw new Error("Interact with watch card failed !");
    }

    ResponseUtils.status200(
      res,
      `${updatedCard.isWatched ? "Watch" : "Unwatch"} card successfully !`,
      {
        card: updatedCard,
      }
    );
  } catch (err) {
    next(err);
  }
};
