const authService = require("../services/authService");
const { responseFormatter } = require("../utils/responseFormatter");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return responseFormatter(
      res,
      true,
      "User registered successfully",
      user,
      null,
      201
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      err.message,
      null,
      "Registration Error",
      400
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    return responseFormatter(
      res,
      true,
      "Login successful",
      { token, user },
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      err.message,
      null,
      "Authentication Error",
      400
    );
  }
};
