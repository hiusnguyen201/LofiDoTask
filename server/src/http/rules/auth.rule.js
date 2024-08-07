import Joi from "joi";

export const LOGIN_RULES = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const REGISTER_RULES = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

REGISTER_RULES.va;

export const REFRESH_TOKEN_RULES = Joi.object({
  refreshToken: Joi.string().required(),
});

export const EMAIL_RESET_PASSWORD_RULES = Joi.object({
  email: Joi.string().required().email(),
});

export const RESET_PASSWORD_RULES = Joi.object({
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});
