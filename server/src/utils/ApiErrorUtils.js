class ApiErrorUtils extends Error {
  constructor({ message, status = 500 }) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static simple({ message, status = 500 }) {
    return new ApiErrorUtils({ message, status });
  }
}

export default ApiErrorUtils;
