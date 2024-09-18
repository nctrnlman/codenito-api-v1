const eventRepository = require("../repositories/eventRepository");

class EventService {
  async getAllEvents(year, month) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const events = await eventRepository.listEvents(startDate, endDate);

      if (!events.length) {
        return { message: "No events found", events: [] };
      }

      return { message: "Events fetched successfully", events };
    } catch (error) {
      console.error("Error fetching events:", error.message);
      throw new Error(`Could not retrieve events: ${error.message}`);
    }
  }

  async getEventById(id) {
    try {
      const event = await eventRepository.findEventById(id);

      if (!event) {
        return { message: "Event not found", event: null };
      }

      return { message: "Event fetched successfully", event };
    } catch (error) {
      console.error("Error fetching event:", error.message);
      throw new Error(`Could not retrieve event: ${error.message}`);
    }
  }

  async createEvent(eventData) {
    try {
      if (!eventData.title || !eventData.date) {
        throw new Error("Title and Date are required fields");
      }

      const newEvent = await eventRepository.createEvent(eventData);
      return { message: "Event created successfully", event: newEvent };
    } catch (error) {
      console.error("Error creating event:", error.message);
      throw new Error(`Could not create event: ${error.message}`);
    }
  }

  async deleteEvent(id) {
    try {
      const deletedEvent = await eventRepository.deleteEvent(id);

      if (!deletedEvent) {
        return { message: "Event not found or unauthorized", event: null };
      }

      return { message: "Event deleted successfully", event: deletedEvent };
    } catch (error) {
      console.error("Error deleting event:", error.message);
      throw new Error(`Could not delete event: ${error.message}`);
    }
  }
}

module.exports = new EventService();
