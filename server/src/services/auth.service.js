import userService from "./user.service.js";
import RefreshToken from "#src/models/refreshToken.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";

export default {
  authenticate,
};

async function authenticate(username, password) {
  const user = await userService.getOne({
    username,
  });

  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const accessToken = JwtUtils.generateToken({ _id: user._id });
  const refreshToken = generateRefreshToken(user._id);

  return {
    user,
    accessToken,
    refreshToken,
  };
}

async function generateRefreshToken(userId) {
  const refreshToken = await RefreshToken.create({
    userId: user._id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return refreshToken;
}
