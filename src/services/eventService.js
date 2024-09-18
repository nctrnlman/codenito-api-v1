const eventRepository = require("../repositories/eventRepository");

class EventService {
  async getAllEvents(userId, startDate, endDate) {
    return await eventRepository.listEvents(userId, startDate, endDate);
  }

  async getEventById(id, userId) {
    return await eventRepository.findEventById(id, userId);
  }

  async createEvent(eventData) {
    return await eventRepository.createEvent(eventData);
  }

  async updateEvent(id, data, userId) {
    return await eventRepository.updateEvent(id, data, userId);
  }

  async deleteEvent(id, userId) {
    return await eventRepository.deleteEvent(id, userId);
  }
}

module.exports = new EventService();