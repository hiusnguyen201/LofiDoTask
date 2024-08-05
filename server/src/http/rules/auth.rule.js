import Joi from "joi";

export const LOGIN_RULES = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
