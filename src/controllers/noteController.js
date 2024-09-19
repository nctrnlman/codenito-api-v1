const noteService = require('../services/noteService');
const { responseFormatter } = require('../utils/responseFormatter');

class NoteController {
  async getNotes(req, res) {
    try {
      const notes = await noteService.getAllNotes(req.user.id);
      return responseFormatter(res, true, 'Notes fetched successfully', notes);
    } catch (error) {
      return responseFormatter(res, false, 'Error fetching notes', null, error.message, 500);
    }
  }

  async createNote(req, res) {
    try {
      const { title, content } = req.body;
      const newNote = await noteService.createNote({ title, content }, req.user.id);
      return responseFormatter(res, true, 'Note created successfully', newNote, null, 201);
    } catch (error) {
      return responseFormatter(res, false, 'Error creating note', null, error.message, 400);
    }
  }

  async updateNote(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const updatedNote = await noteService.updateNote(id, { title, content }, req.user.id);
      return responseFormatter(res, true, 'Note updated successfully', updatedNote);
    } catch (error) {
      return responseFormatter(res, false, 'Error updating note', null, error.message, 400);
    }
  }

  async deleteNote(req, res) {
    try {
      const { id } = req.params;
      await noteService.deleteNote(id, req.user.id);
      return responseFormatter(res, true, 'Note deleted successfully');
    } catch (error) {
      return responseFormatter(res, false, 'Error deleting note', null, error.message, 400);
    }
  }
}

module.exports = new NoteController();