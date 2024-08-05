class ApiErrorUtils extends Error {
  constructor({ message, status = 500 }) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static simple(message, status = 500) {
    return new ApiErrorUtils({ message, status });
  }

  static simple2(obj) {
    return new ApiErrorUtils({ message: obj.message, status: obj.status });
  }
}

export default ApiErrorUtils;
