const express = require("express");
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  body("password").isLength({ min: 5, max: 10 }),
  body("email").isEmail(),
  authController.register
);
router.get("/activate/:id", authController.activate);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/get-users", authMiddleware, authController.getUsers);

module.exports = router;
