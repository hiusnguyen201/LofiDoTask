class ApiErrorUtils extends Error {
  constructor({ message, status = 500 }) {
    super(message);
    this.message = message;
    this.status = status;
  }

  static simple(message, status = 500) {
    return new ApiErrorUtils({ message, status });
  }
}

export default ApiErrorUtils;
