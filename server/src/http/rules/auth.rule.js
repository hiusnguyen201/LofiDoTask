import Joi from "joi";
import User from "#src/models/user.model.js";
import { isExist } from "./custom.rule.js";

export const LOGIN_RULES = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const REGISTER_RULES = Joi.object({
  username: Joi.string()
    .required()
    .custom((val) => {
      if (!isExist("username", val, User)) {
        throw new Error(`"username" is already taken`);
      }
      return val;
    }),
  email: Joi.string()
    .required()
    .email()
    .custom((val) => {
      if (!isExist("email", val, User)) {
        throw new Error(`"email" is already taken`);
      }
      return val;
    }),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

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
