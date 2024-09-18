const Event = require("../models/Event");

class EventRepository {
  async listEvents(startDate, endDate) {
    const filter = {};

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = startDate;
      }
      if (endDate) {
        filter.date.$lte = endDate;
      }
    }

    return await Event.find(filter).sort({ date: 1 });
  }

  async findEventById(id) {
    return await Event.findById(id);
  }

  async createEvent(eventData) {
    const event = new Event(eventData);
    return await event.save();
  }

  async updateEvent(id, data) {
    return await Event.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteEvent(id) {
    return await Event.findByIdAndDelete(id);
  }
}

module.exports = new EventRepository();
