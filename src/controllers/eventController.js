const eventService = require("../services/eventService");
const { responseFormatter } = require("../utils/responseFormatter");

class EventController {
  async getEvents(req, res) {
    try {
      const { year, month } = req.query;

      if (!year || !month) {
        return responseFormatter(
          res,
          false,
          "Year and month are required",
          null,
          "Invalid input",
          400
        );
      }

      const events = await eventService.getAllEvents(year, month);
      return responseFormatter(
        res,
        true,
        "Events fetched successfully",
        events
      );
    } catch (error) {
      return responseFormatter(
        res,
        false,
        "Error fetching events",
        null,
        error.message,
        500
      );
    }
  }

  async createEvent(req, res) {
    try {
      const { title, date, link } = req.body;

      if (!title || !date) {
        return responseFormatter(
          res,
          false,
          "Title and date are required",
          null,
          "Invalid input",
          400
        );
      }

      const newEvent = await eventService.createEvent({
        title,
        date,
        link,
      });
      return responseFormatter(
        res,
        true,
        "Event created successfully",
        newEvent,
        null,
        201
      );
    } catch (error) {
      return responseFormatter(
        res,
        false,
        "Error creating event",
        null,
        error.message,
        400
      );
    }
  }

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      const deletedEvent = await eventService.deleteEvent(id);

      if (!deletedEvent) {
        return responseFormatter(
          res,
          false,
          "Event not found",
          null,
          "Event not found",
          404
        );
      }

      return responseFormatter(
        res,
        true,
        "Event deleted successfully",
        deletedEvent
      );
    } catch (error) {
      return responseFormatter(
        res,
        false,
        "Error deleting event",
        null,
        error.message,
        500
      );
    }
  }
}

module.exports = new EventController();
