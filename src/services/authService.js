const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error(
        "Email is already registered. Please log in or use a different email."
      );
    }

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = await userRepository.createUser(userData);
    return user;
  }

  async login({ email, password }) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("No account found. Please check and try again.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Email or password is incorrect. Please try again.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user };
  }
}

module.exports = new AuthService();
