import RefreshToken from "#src/models/refreshToken.model.js";
import mailService from "./mail.service.js";
import userService from "./user.service.js";
import responseCode from "#src/constants/responseCode.constant.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";
import BcryptUtils from "#src/utils/BcryptUtils.js";
import CryptoUtils from "#src/utils/CryptoUtils.js";

export default {
  authenticate,
  revokeToken,
  refreshToken,
  sendOtpResetPasswordViaEmail,
  resetPassword,
};

/**
 * Authenticate
 * @param {*} username
 * @param {*} password
 * @param {*} ipAddress
 * @returns
 */
async function authenticate(username, password, ipAddress) {
  const user = await userService.getOne(username, "* password");

  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const isMatch = BcryptUtils.compareHash(password, user.password);
  if (!isMatch) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_PASSWORD);
  }

  const userData = user._doc;
  delete userData.password;

  const accessToken = JwtUtils.generateToken({ _id: user._id });
  const refreshToken = await generateRefreshToken(user._id, ipAddress);

  return {
    user,
    accessToken,
    refreshToken: refreshToken.token,
  };
}

/**
 * Generate refresh token
 * @param {*} userId
 * @param {*} ipAddress
 * @returns
 */
async function generateRefreshToken(userId, ipAddress) {
  const refreshToken = await RefreshToken.create({
    user: userId,
    token: CryptoUtils.randomCrypto(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
  return refreshToken;
}

/**
 * Refresh token
 * @param {*} token
 * @param {*} ipAddress
 * @returns
 */
async function refreshToken(token, ipAddress) {
  const currentRefreshToken = await getRefreshToken(token);
  if (currentRefreshToken.createdByIp !== ipAddress) {
    throw ApiErrorUtils.simple(
      responseCode.AUTH.REVOKE_TOKEN_FROM_UNAUTHORIZED_IP
    );
  }

  const { user } = currentRefreshToken;

  const newRefreshToken = await generateRefreshToken(user._id, ipAddress);
  currentRefreshToken.revokedAt = Date.now();
  currentRefreshToken.revokedByIp = ipAddress;
  currentRefreshToken.replacedByToken = newRefreshToken.token;
  await currentRefreshToken.save();
  await newRefreshToken.save();

  const accessToken = JwtUtils.generateToken({ _id: user._id });

  return {
    user,
    accessToken,
    refreshToken: newRefreshToken.token,
  };
}

/**
 * Revoke token
 * @param {*} token
 * @param {*} ipAddress
 * @returns
 */
async function revokeToken(token, ipAddress) {
  const refreshToken = await getRefreshToken(token);
  refreshToken.revokedAt = Date.now();
  refreshToken.revokedByIp = ipAddress;
  const status = await refreshToken.save();
  return !!status;
}

/**
 * Get refreshToken
 * @param {*} token
 * @returns
 */
async function getRefreshToken(token) {
  const refreshToken = await RefreshToken.findOne({
    token,
  }).populate({
    path: "user",
    select: "-password",
  });

  if (!refreshToken || !refreshToken.isActive) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_TOKEN);
  }

  return refreshToken;
}

/**
 * Send otp token reset password
 * @param {*} email
 * @returns
 */
async function sendOtpResetPasswordViaEmail(email) {
  const user = await userService.getOne(email);
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const token = JwtUtils.generateToken(
    {
      _id: user._id,
    },
    "5m"
  );

  return await mailService.sendMail(
    email,
    "Reset password",
    "Here is your link to reset password: " +
      process.env.SERVER_URL +
      `/${token}`
  );
}

async function resetPassword(token, password) {
  const decoded = JwtUtils.verifyToken(token);
  if (!decoded) {
    throw ApiErrorUtils.simple(responseCode.AUTH.INVALID_TOKEN);
  }

  const user = await userService.getOne(decoded._id);
  if (!user) {
    throw ApiErrorUtils.simple(responseCode.AUTH.USER_NOT_FOUND);
  }

  const hash = BcryptUtils.makeHash(password);
  user.password = hash;
  return await user.save();
}
