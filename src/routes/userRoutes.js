const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Get all users
router.get("/", authMiddleware, userController.getAllUsers);

// Get single user
router.get("/:id", authMiddleware, userController.getUserById);

// Update user
router.put("/:id", authMiddleware, userController.updateUser);

// Delete user
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
