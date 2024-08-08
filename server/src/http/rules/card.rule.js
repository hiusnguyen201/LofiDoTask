import Joi from "joi";
import regexPattern from "#src/constants/regexPattern.constant.js";

export const CREATE_RULES = Joi.object({
  name: Joi.string().required(),
  listId: Joi.string().required().regex(regexPattern.UUID),
});

export const UPDATE_RULES = Joi.object({
  name: Joi.string().required(),
});
