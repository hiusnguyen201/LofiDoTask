import Joi from "joi";

export const CREATE_RULES = Joi.object({
  name: Joi.string().required(),
});

export const UPDATE_RULES = Joi.object({
  name: Joi.string().required(),
});
