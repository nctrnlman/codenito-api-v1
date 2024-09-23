const Client = require("../models/Client");

class ClientRepository {
  async listClients(userId) {
    return await Client.find({ createdBy: userId }).sort({ createdAt: -1 });
  }

  async findClientById(id) {
    return await Client.findById(id);
  }

  async createClient(clientData) {
    const client = new Client(clientData);
    return await client.save();
  }

  async updateClient(id, data) {
    return await Client.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteClient(id) {
    return await Client.findByIdAndDelete(id);
  }
}

module.exports = new ClientRepository();