module.exports = class BaseError extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnAuthorizedError() {
    return new BaseError(401, "User is not authorized");
  }
  static BadRequestError(messsage, errors = []) {
    return new BaseError(400, messsage, errors);
  }
};
