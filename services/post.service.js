const postModel = require("../models/post.model");
const fileService = require("./file.service");

class PostService {
  async get() {
    const allPosts = await postModel.find().populate("author");
    return allPosts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Id is required");
    }
    const post = await postModel.findById(id);
    return post;
  }

  async post(post, img, author) {
    const fileName = fileService.save(img);
    const newPost = await postModel.create({ ...post, img: fileName, author });
    return newPost;
  }

  async delete(id) {
    const deletedPost = await postModel.findByIdAndDelete(id);
    return deletedPost;
  }

  async put(post, id) {
    if (!id) {
      throw new Error("Id is required");
    }
    const updatedPost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    return updatedPost;
  }
}

module.exports = new PostService();
