const responseCode = {
  AUTH: {
    USER_NOT_FOUND: {
      status: 404,
      message: {
        en: "User not found",
        vi: "Tài khoản không tồn tại",
      },
    },
    INVALID_PASSWORD: {
      status: 401,
      message: {
        en: "Invalid password",
        vi: "Mật khẩu không hợp lệ",
      },
    },
    INVALID_TOKEN: {
      status: 401,
      message: {
        en: "Invalid token",
        vi: "Token không hợp lệ",
      },
    },
    REVOKE_TOKEN_FROM_UNAUTHORIZED_IP: {
      status: 401,
      message: {
        en: "Can't refresh token from other ip address",
        vi: "Không thể thu hồi refresh token từ địa chỉ ip khác",
      },
    },
    BEARER_TOKEN_IS_EMPTY: {
      status: 401,
      mesage: {
        en: "No token provided",
        vi: "Token không được cung cấp",
      },
    },
    INVALID_FORMAT_BEARER_TOKEN: {
      status: 400,
      message: {
        en: "Invalid token format. Format is Authorization: Bearer [token]",
        vi: "Token sai định dạng. Định dạng là Authorization: Bearer [token]",
      },
    },
  },
  BOARD: {
    BOARD_STARRED: {
      status: 400,
      message: {
        en: "Board already starred",
        vi: "Bảng đã được sao",
      },
    },
    BOARD_UNSTARRED: {
      status: 400,
      message: {
        en: "Board doesn't have starred",
        vi: "Bảng không có sao",
      },
    },
    BOARD_NOT_FOUND: {
      status: 404,
      message: {
        en: "Board not found",
        vi: "Bảng không tồn tại",
      },
    },
  },
};

export default responseCode;
