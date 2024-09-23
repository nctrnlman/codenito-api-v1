const clientService = require("../services/clientService");
const { responseFormatter } = require("../utils/responseFormatter");

exports.listClients = async (req, res) => {
  try {
    const clients = await clientService.listClients(req.user.id);
    return responseFormatter(
      res,
      true,
      "Clients retrieved successfully",
      clients,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      err.message,
      null,
      "Client Retrieval Error",
      400
    );
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await clientService.getClient(req.params.id);
    if (!client) {
      return responseFormatter(
        res,
        false,
        "Client not found",
        null,
        "Not Found",
        404
      );
    }
    return responseFormatter(
      res,
      true,
      "Client retrieved successfully",
      client,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      err.message,
      null,
      "Client Retrieval Error",
      400
    );
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = await clientService.createClient(req.body, req.user.id);
    return responseFormatter(
      res,
      true,
      "Client created successfully",
      client,
      null,
      201
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      err.message,
      null,
      "Client Creation Error",
      400
    );
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await clientService.updateClient(req.params.id, req.body);
    if (!client) {
      return responseFormatter(
        res,
        false,
        "Client not found",
        null,
        "Not Found",
        404
      );
    }
    return responseFormatter(
      res,
      true,
      "Client updated successfully",
      client,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      err.message,
      null,
      "Client Update Error",
      400
    );
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await clientService.deleteClient(req.params.id);
    if (!client) {
      return responseFormatter(
        res,
        false,
        "Client not found",
        null,
        "Not Found",
        404
      );
    }
    return responseFormatter(
      res,
      true,
      "Client deleted successfully",
      null,
      null,
      200
    );
  } catch (err) {
    return responseFormatter(
      res,
      false,
      err.message,
      null,
      "Client Deletion Error",
      400
    );
  }
};