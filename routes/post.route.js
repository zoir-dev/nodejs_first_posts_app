const express = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorMiddleware = require("../middlewares/author.middleware");

const router = express.Router();

router.get("/", postController.get);
router.get("/:id", postController.getOne);
router.post("/", postController.post);
router.delete("/:id", postController.delete);
router.put("/:id", postController.put);

module.exports = router;
