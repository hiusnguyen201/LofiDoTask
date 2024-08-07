import httpStatus from "http-status";

const responseCode = {
  AUTH: {
    USER_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: {
        en: "User not found",
        vi: "Tài khoản không tồn tại",
      },
    },
    INVALID_PASSWORD: {
      status: httpStatus.UNAUTHORIZED,
      message: {
        en: "Invalid password",
        vi: "Mật khẩu không hợp lệ",
      },
    },
    INVALID_TOKEN: {
      status: httpStatus.UNAUTHORIZED,
      message: {
        en: "Invalid token",
        vi: "Token không hợp lệ",
      },
    },
    REVOKE_TOKEN_FROM_UNAUTHORIZED_IP: {
      status: httpStatus.UNAUTHORIZED,
      message: {
        en: "Can't refresh token from other ip address",
        vi: "Không thể thu hồi refresh token từ địa chỉ ip khác",
      },
    },
    BEARER_TOKEN_IS_EMPTY: {
      status: httpStatus.UNAUTHORIZED,
      mesage: {
        en: "No token provided",
        vi: "Token không được cung cấp",
      },
    },
    INVALID_FORMAT_BEARER_TOKEN: {
      status: httpStatus.BAD_REQUEST,
      message: {
        en: "Invalid token format. Format is Authorization: Bearer [token]",
        vi: "Token sai định dạng. Định dạng là Authorization: Bearer [token]",
      },
    },
    EXIST_USERNAME: {
      status: httpStatus.BAD_REQUEST,
      message: {
        en: "Username already exist",
        vi: "Username đã tồn tại",
      },
    },
    EXIST_EMAIL: {
      status: httpStatus.BAD_REQUEST,
      message: {
        en: "Email already exist",
        vi: "Email đã tồn tại",
      },
    },
  },
  BOARD: {
    BOARD_NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      message: {
        en: "Board not found",
        vi: "Bảng không tồn tại",
      },
    },
  },
};

export default responseCode;
