import jwt from "jsonwebtoken";

class JwtUtils {
  static generateToken(payload, expiresIn = "7d") {
    return jwt.sign(payload, process.env.SECRET_JWT_TOKEN, {
      expiresIn,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_JWT_TOKEN);
  }
}

export default JwtUtils;
