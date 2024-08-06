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
  },
};

export default responseCode;
