import { customAlphabet } from "nanoid";
import REGEX from "#src/constants/regex.constant.js";

class StringUtils {
  static isUUID(str) {
    return REGEX.UUID.test(str);
  }

  static isBearerToken(str) {
    return REGEX.BEARER_TOKEN.test(str);
  }

  static isEmailAddress(str) {
    return REGEX.EMAIL.test(str);
  }

  static isPhoneNumber(str) {
    return REGEX.PHONE.test(str);
  }

  static generateNanoID() {
    const alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const nanoid = customAlphabet(alphabet, 8);
    return nanoid();
  }
}

export default StringUtils;
