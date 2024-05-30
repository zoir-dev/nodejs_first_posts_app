const express = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorMiddleware = require("../middlewares/author.middleware");

const router = express.Router();

router.get("/", postController.get);
router.get("/:id", postController.getOne);
router.post("/", authMiddleware, postController.post);
router.delete("/:id", authMiddleware, authorMiddleware, postController.delete);
router.put("/:id", authMiddleware, authorMiddleware, postController.put);

module.exports = router;
