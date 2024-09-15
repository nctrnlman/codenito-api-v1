const userService = require("../services/userService");
const { responseFormatter } = require("../utils/responseFormatter");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return responseFormatter(
      res,
      true,
      "Users retrieved successfully",
      users,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      "Error retrieving users",
      null,
      err.message,
      500
    );
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return responseFormatter(
        res,
        false,
        "User not found",
        null,
        "User not found",
        404
      );
    }
    return responseFormatter(
      res,
      true,
      "User retrieved successfully",
      user,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      "Error retrieving user",
      null,
      err.message,
      500
    );
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return responseFormatter(
        res,
        false,
        "User not found",
        null,
        "User not found",
        404
      );
    }
    return responseFormatter(
      res,
      true,
      "User updated successfully",
      updatedUser,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      "Error updating user",
      null,
      err.message,
      500
    );
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return responseFormatter(
        res,
        false,
        "User not found",
        null,
        "User not found",
        404
      );
    }
    return responseFormatter(
      res,
      true,
      "User deleted successfully",
      deletedUser,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      "Error deleting user",
      null,
      err.message,
      500
    );
  }
};
