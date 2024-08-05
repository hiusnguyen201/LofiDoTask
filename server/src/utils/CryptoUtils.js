import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

class CryptoUtils {
  static randomCrypto() {
    return CryptoJS.SHA256(uuidv4() + Math.random());
  }
}

export default CryptoUtils;
