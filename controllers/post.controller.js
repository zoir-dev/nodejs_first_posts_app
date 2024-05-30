const BaseError = require("../errors/base.error");
const postService = require("../services/post.service");

class PostController {
  async get(req, res, next) {
    try {
      try {
        const allPosts = await postService.get();
        res.status(200).json(allPosts);
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const post = await postService.getOne(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async post(req, res, next) {
    try {
      req.body.author = req.user.id;

      if (!req.files) {
        throw new Error("Image is required");
      }

      console.log(req.files);
      const post = await postService.post(req.body, req.files.img, req.user.id);
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(BaseError.BadRequestError(error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const post = await postService.delete(req.params.id);
      res.status(201).json(post);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }

  async put(req, res, next) {
    try {
      const { body, params } = req;
      const post = await postService.put(body, params.id);
      res.status(200).json(post);
    } catch (error) {
      next(BaseError.BadRequestError(error.message));
    }
  }
}

module.exports = new PostController();
