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
  },
};

export default responseCode;
