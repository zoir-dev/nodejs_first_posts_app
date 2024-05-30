const BaseError = require("../errors/base.error");
const postModel = require("../models/post.model");

module.exports = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    const authorId = req.user.id;

    if (post.author.toString() !== authorId.toString()) {
      return next(
        BaseError.BadRequestError("Only author can control this post")
      );
    }

    next();
  } catch (error) {
    return next(BaseError.BadRequestError("Only author can control this post"));
  }
};
