const BaseError = require("../errors/base.error");

module.exports = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.json(500).json({ message: "Server error" });
};
