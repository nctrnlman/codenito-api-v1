const ticketService = require("../services/ticketService");
const { responseFormatter } = require("../utils/responseFormatter");

class TicketController {
  async createTicket(req, res) {
    try {
      const ticket = await ticketService.createTicket(req.body);
      responseFormatter(
        res,
        true,
        "Ticket created successfully",
        ticket,
        null,
        201
      );
    } catch (error) {
      responseFormatter(res, false, error.message, null, error, 400);
    }
  }

  async getTicketById(req, res) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id);
      responseFormatter(res, true, "Ticket retrieved successfully", ticket);
    } catch (error) {
      responseFormatter(res, false, error.message, null, error, 404);
    }
  }

  async updateTicket(req, res) {
    try {
      const updatedTicket = await ticketService.updateTicket(
        req.params.id,
        req.body
      );
      responseFormatter(
        res,
        true,
        "Ticket updated successfully",
        updatedTicket
      );
    } catch (error) {
      responseFormatter(res, false, error.message, null, error, 404);
    }
  }

  async deleteTicket(req, res) {
    try {
      await ticketService.deleteTicket(req.params.id);
      responseFormatter(res, true, "Ticket deleted successfully");
    } catch (error) {
      responseFormatter(res, false, error.message, null, error, 404);
    }
  }

  async getAllTickets(req, res) {
    try {
      const { page = 1, limit = 10, search = "", status = "" } = req.query;
      const result = await ticketService.getAllTickets(
        page,
        limit,
        search,
        status
      );
      responseFormatter(res, true, "Tickets retrieved successfully", result);
    } catch (error) {
      responseFormatter(res, false, error.message, null, error, 500);
    }
  }
}

module.exports = new TicketController();
