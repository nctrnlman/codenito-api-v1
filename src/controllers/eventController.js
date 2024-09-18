const eventService = require("../services/eventService");

exports.getAllEvents = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const events = await eventService.getAllEvents(req.user.id, new Date(startDate), new Date(endDate));
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id, req.user.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body, user: req.user.id };
    const newEvent = await eventService.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: "Error creating event", error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body, req.user.id);
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Error updating event", error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await eventService.deleteEvent(req.params.id, req.user.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};