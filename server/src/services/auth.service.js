import userService from "./user.service.js";
import RefreshToken from "#src/models/refreshToken.model.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";
import CypherUtils from "#src/utils/CypherUtils.js";
import CryptoUtils from "#src/utils/CryptoUtils.js";

export default {
  authenticate,
  revokeToken,
};

async function authenticate(username, password) {
  const user = await userService.getOne(username);

  if (!user) {
    throw ApiErrorUtils.simple2(responseCode.AUTH.USER_NOT_FOUND);
  }

  const isMatch = CypherUtils.compareHash(password, user.password);
  if (!isMatch) {
    throw ApiErrorUtils.simple2(responseCode.AUTH.INVALID_PASSWORD);
  }

  const userData = user._doc;
  delete userData.password;

  const accessToken = JwtUtils.generateToken({ _id: user._id });
  const refreshToken = await generateRefreshToken(user._id);

  return {
    user,
    accessToken,
    refreshToken: refreshToken.token,
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

async function revokeToken(token) {
  const refreshToken = await getRefreshToken(token);
  console.log(refreshToken);
  refreshToken.revokedAt = Date.now();
  await refreshToken.save();
}

async function getRefreshToken(token) {
  const refreshToken = await RefreshToken.findOne({
    token,
  }).populate({
    path: "User",
    select: "-password",
  });

  if (!refreshToken) {
    throw ApiErrorUtils.simple2(responseCode.AUTH.INVALID_TOKEN);
  }

  return refreshToken;
}
