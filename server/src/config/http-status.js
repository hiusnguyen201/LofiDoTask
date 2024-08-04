const httpStatus = {
  // 200-299
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // 400-499
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,

  // >= 500
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = httpStatus;
