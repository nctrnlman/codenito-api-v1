const express = require('express');
const router = express.Router();
const Event = require('../models/Events');

router.get('/', async (req, res) => {
  console.log('GET /api/events - Received request:', req.query);
  try {
    const { year, month } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    console.log(`Fetching events from ${startDate} to ${endDate}`);

    const events = await Event.find({
      date: { $gte: startDate, $lte: endDate }
    });

    console.log(`Found ${events.length} events`);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

router.post('/', async (req, res) => {
  console.log('POST /api/events - Received request:', req.body);
  try {
    const { title, date, link, user } = req.body;
    const newEvent = new Event({ title, date, link, user });
    const savedEvent = await newEvent.save();
    console.log('Event saved successfully:', savedEvent);
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ message: 'Error creating event', error: error.message });
  }
});

// New DELETE route
router.delete('/:id', async (req, res) => {
  console.log('DELETE /api/events/:id - Received request:', req.params);
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log('Event deleted successfully:', deletedEvent);
    res.json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

module.exports = router;