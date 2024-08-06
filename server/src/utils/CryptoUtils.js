import CryptoJS from "crypto-js";
import StringUtils from "./StringUtils.js";

class CryptoUtils {
  static randomCrypto() {
    const str = StringUtils.generateUUID();
    return CryptoJS.SHA256(str + Math.random());
  }
}

export default CryptoUtils;
