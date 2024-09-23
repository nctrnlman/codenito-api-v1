const clientRepository = require("../repositories/clientRepository");

class ClientService {
  async listClients(userId) {
    return await clientRepository.listClients(userId);
  }

  async getClient(id) {
    return await clientRepository.findClientById(id);
  }

  async createClient(clientData, userId) {
    clientData.createdBy = userId;
    return await clientRepository.createClient(clientData);
  }

  async updateClient(id, data) {
    return await clientRepository.updateClient(id, data);
  }

  async deleteClient(id) {
    return await clientRepository.deleteClient(id);
  }
}

module.exports = new ClientService();