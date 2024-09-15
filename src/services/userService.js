const userRepository = require("../repositories/userRepository");

class UserService {
  async getAllUsers() {
    return await userRepository.listUsers();
  }

  async getUserById(id) {
    return await userRepository.findUserById(id);
  }

  async updateUser(id, data) {
    return await userRepository.updateUser(id, data);
  }

  async deleteUser(id) {
    return await userRepository.deleteUser(id);
  }
}

module.exports = new UserService();
