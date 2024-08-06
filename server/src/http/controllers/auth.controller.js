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

    ResponseUtils.status201(res, "Register successful !", {
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

    ResponseUtils.status200(res, "Login successful !", {
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

    ResponseUtils.status200(res, "Refresh Token successful !", {
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
    await authService.revokeToken(refreshToken);
    ResponseUtils.status204(res, "Logout successful !");
  } catch (err) {
    next(err);
  }
};
