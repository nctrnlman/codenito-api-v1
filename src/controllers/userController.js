const userService = require("../services/userService");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(res, "Users retrieved successfully", users, 200);
  } catch (err) {
    return errorResponse(res, "Error retrieving users", err.message, 500);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return errorResponse(res, "User not found", null, 404);
    }
    return successResponse(res, "User retrieved successfully", user, 200);
  } catch (err) {
    return errorResponse(res, "Error retrieving user", err.message, 500);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return errorResponse(res, "User not found", null, 404);
    }
    return successResponse(res, "User updated successfully", updatedUser, 200);
  } catch (err) {
    return errorResponse(res, "Error updating user", err.message, 500);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return errorResponse(res, "User not found", null, 404);
    }
    return successResponse(res, "User deleted successfully", deletedUser, 200);
  } catch (err) {
    return errorResponse(res, "Error deleting user", err.message, 500);
  }
};
