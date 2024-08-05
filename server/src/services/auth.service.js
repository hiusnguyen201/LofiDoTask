import userService from "./user.service.js";
import RefreshToken from "#src/models/refreshToken.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";
import CypherUtils from "#src/utils/CypherUtils.js";
import CryptoUtils from "#src/utils/CryptoUtils.js";

export default {
  authenticate,
};

async function authenticate(username, password) {
  const user = await userService.getOne(username);

  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const isMatch = CypherUtils.compareHash(password, user.password);
  if (!isMatch) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_PASSWORD);
  }

  const userData = user._doc;
  delete userData.password;

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
    userId,
    token: CryptoUtils.randomCrypto(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return refreshToken;
}
