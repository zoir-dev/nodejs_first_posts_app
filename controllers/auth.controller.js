const BaseError = require("../errors/base.error");
const authService = require("../services/auth.service");
const { validationResult } = require("express-validator");
class AuthController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          BaseError.BadRequestError("validation error", errors.array())
        );
      }

      const { email, password } = req.body;
      const data = await authService.register(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(data);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async activate(req, res, next) {
    try {
      const id = req.params.id;
      await authService.activate(id);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(data);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ status: 200 });
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await authService.getUsers();
      return res.json(users);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }
}

module.exports = new AuthController();
