const User = require("../models/User");

class UserRepository {
  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async listUsers() {
    return await User.find();
  }
}

module.exports = new UserRepository();
