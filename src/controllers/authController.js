const authService = require("../services/authService");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return successResponse(res, "User registered successfully", user, 201);
  } catch (err) {
    return errorResponse(res, err.message, "RegistrationError", 400);
  }
};

exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    return successResponse(res, "Login successful", { token, user }, 200);
  } catch (err) {
    return errorResponse(res, err.message, "AuthenticationError", 400);
  }
};
