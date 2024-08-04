const responseUtils = {
  /**
   * Send response in JSON format
   * @param {*} res - Express response object
   * @param {*} statusCode - HTTP status code
   * @param {*} message - Message to be sent
   * @param {*} data - Data to be sent
   */
  sendJson: (res, statusCode, message, data = null, extras = {}) => {
    const responseData = {
      success: statusCode >= 200 && statusCode < 300, // 200-299 Success response
      message,
    };

    res.set("Content-Type", "application/json");

    Object.assign(responseData, data && { data });
    res.json({ ...responseData, ...extras });
    res.end();
  },

  /**
   * Send **200 OK** success status response
   */
  status200: function (res, message = null, data = null, extras = {}) {
    this.sendJson(res, 200, message, data, extras);
  },

  /**
   * Send **201 Created** success status response
   */
  status201: function (res, message = null, data = null, extras = {}) {
    this.sendJson(res, 201, message, data, extras);
  },

  /**
   * Send **204 No Content** success status response
   */
  status204: function (res, message = null) {
    this.sendJson(res, 204, message);
  },

  /**
   * Send **400 Bad Request** response(validation Error Response)
   */
  status400: (res, message = "Bad Request!") => {
    this.sendJson(res, 400, message);
  },

  /**
   * Send **401 Unauthorized** client error status response
   */
  status401: (res, message = "Unauthorized!") => {
    this.sendJson(res, 401, message);
  },

  /**
   * Send **404 Not Found** client error response
   */
  status404: (res, message = "Not Found!") => {
    this.sendJson(res, 404, message);
  },

  /**
   * Send **405 Method Not Allowed response** client error response
   */
  status405: (res, message = "Method not allowed!") => {
    this.sendJson(res, 405, message);
  },

  /**
   * Send **500 Internal Server Error** server error response
   */
  status500: (res, err) => {
    this.sendJson(res, 500, err.message, { detail: err });
  },
};

module.exports = responseUtils;
