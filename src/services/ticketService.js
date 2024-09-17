const Ticket = require("../models/Ticket");
const User = require("../models/User");
const ticketRepository = require("../repositories/ticketRepository");

class TicketService {
  async createTicket(ticketData) {
    try {
      const [pic, requestor] = await Promise.all([
        User.findById(ticketData.pic),
        User.findById(ticketData.requestor),
      ]);

      if (!pic || !requestor) {
        throw new Error("User(s) not found");
      }

      const ticket = await Ticket.create(ticketData);

      const populatedTicket = await Ticket.findById(ticket._id)
        .populate("pic", "name email")
        .populate("requestor", "name email");

      return populatedTicket;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }

  async getTicketById(ticketId) {
    const ticket = await ticketRepository.findTicketById(ticketId);
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }

  async updateTicket(ticketId, data) {
    const updatedTicket = await ticketRepository.updateTicket(ticketId, data);
    if (!updatedTicket) throw new Error("Ticket not found");
    return updatedTicket;
  }

  async deleteTicket(ticketId) {
    const deletedTicket = await ticketRepository.deleteTicket(ticketId);
    if (!deletedTicket) throw new Error("Ticket not found");
    return deletedTicket;
  }

  async getAllTickets(page = 1, limit = 10, search = "", status = "") {
    const { tickets, total } = await ticketRepository.getAllTickets(
      page,
      limit,
      search,
      status
    );
    return { tickets, total, page, limit };
  }
}

module.exports = new TicketService();
