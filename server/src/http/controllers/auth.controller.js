import userService from "#src/services/user.service.js";
import authService from "#src/services/auth.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";
import FormatUtils from "#src/utils/FormatUtils.js";

export const register = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    if (!newUser || !newUser._doc) {
      throw new Error("Register failed !");
    }

    ResponseUtils.status201(res, "Register successfully !", {
      token: JwtUtils.generateToken({ _id: newUser._id }),
      user: FormatUtils.formatOneUser(newUser),
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const ipAddress = req.ipv4;

    const data = await authService.authenticate(
      username,
      password,
      ipAddress
    );

    if (!data.user || !data.accessToken || !data.refreshToken) {
      throw new Error("Authenticate failed !");
    }

    ResponseUtils.status200(res, "Login successfully !", {
      user: FormatUtils.formatOneUser(data.user),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const ipAddress = req.ipv4;
    const refreshToken = req.body.refreshToken;
    const data = await authService.refreshToken(refreshToken, ipAddress);

    if (!data.user || !data.accessToken || !data.refreshToken) {
      throw new Error("Refresh token failed !");
    }

    ResponseUtils.status200(res, "Refresh token successfully !", {
      user: FormatUtils.formatOneUser(data.user),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const status = await authService.revokeToken(refreshToken);

    if (!status) {
      throw new Error("Logout failed !");
    }

    ResponseUtils.status204(res, "Logout successfully !");
  } catch (err) {
    next(err);
  }
};
