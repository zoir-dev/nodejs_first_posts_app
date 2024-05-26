const BaseError = require("../errors/base.error");
const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next(BaseError.UnAuthorizedError());
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return next(BaseError.UnAuthorizedError());
    }

    const userData = tokenService.validateAccessToken(token);
    if (!userData) {
      return next(BaseError.UnAuthorizedError());
    }

    req.user = userData;

    next();
  } catch (error) {
    return next(BaseError.UnAuthorizedError());
  }
};
