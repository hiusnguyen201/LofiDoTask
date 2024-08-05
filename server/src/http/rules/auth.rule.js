import Joi from "joi";

export const LOGIN_RULES = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const REGISTER_RULES = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});
