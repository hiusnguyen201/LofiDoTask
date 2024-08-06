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
  email: Joi.string().label("email").required().email(),
  password: Joi.string().label("password").required(),
  confirmPassword: Joi.string()
    .label("confirmPassword")
    .required()
    .valid(Joi.ref("password")),
});
