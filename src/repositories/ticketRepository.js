const Ticket = require("../models/Ticket");

class TicketRepository {
  async createTicket(ticketData) {
    return Ticket.create(ticketData);
  }

  async findTicketById(ticketId) {
    return Ticket.findById(ticketId)
      .populate("pic", "name email role")
      .populate("requestor", "name email role");
  }

  async updateTicket(ticketId, ticketData) {
    return Ticket.findByIdAndUpdate(ticketId, ticketData, { new: true })
      .populate("pic", "name email role")
      .populate("requestor", "name email role");
  }

  async deleteTicket(ticketId) {
    return Ticket.findByIdAndDelete(ticketId);
  }

  async getAllTickets(page, limit, search = "", status = "") {
    const query = {};
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: "i" };

    const tickets = await Ticket.find(query)
      .populate("pic", "name email role")
      .populate("requestor", "name email role")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Ticket.countDocuments(query);

    return { tickets, total };
  }
}

module.exports = new TicketRepository();
