import userService from "#src/services/user.service.js";
import authService from "#src/services/auth.service.js";
import ResponseUtils from "#src/utils/ResponseUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";

export const register = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    if (newUser && newUser._doc) {
      const userData = newUser._doc;
      delete userData.password;

      ResponseUtils.status201(res, "Register successful !", {
        token: JwtUtils.generateToken({ _id: user._id }),
        user: userData,
      });
    }

    throw new Error("Register failed !");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await authService.authenticate(username, password);
    const userData = data.user;
    delete userData.password;

    ResponseUtils.status200(res, "Login successful !", {
      user: userData,
      accessToken: data.accessToken,
      refreshToken: userData.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {};
