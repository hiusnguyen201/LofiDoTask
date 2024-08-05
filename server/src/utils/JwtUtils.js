import jwt from "jsonwebtoken";
import ApiErrorUtils from "./ApiErrorUtils.js";
import REGEX from "#src/constants/regex.constant.js";

class JwtUtils {
  static generateToken(payload, expiresIn = "7d") {
    return jwt.sign(payload, process.env.SECRET_JWT_TOKEN, {
      expiresIn,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_JWT_TOKEN);
  }

  static jwtMiddleware(req, res, next) {
    let token =
      req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
      return next(ApiErrorUtils.simple("No token provided", 401));
    }

    if (!REGEX.BEARER_TOKEN.test(token)) {
      return next(
        ApiErrorUtils.simple(
          "Invalid token format. Format is Authorization: Bearer [token]",
          400
        )
      );
    } else {
      token = token.split(" ")[1];
    }

    const decoded = JwtUtils.verifyToken(token);
    if (!decoded) {
      return next(ApiErrorUtils.simple("Invalid token", 401));
    }
    req.user = decoded;
    next();
  }
}

export default JwtUtils;
