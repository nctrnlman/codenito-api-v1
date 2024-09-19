const Note = require('../models/Note');

class NoteRepository {
  async listNotes(userId) {
    return await Note.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findNoteById(id) {
    return await Note.findById(id);
  }

  async createNote(noteData) {
    const note = new Note(noteData);
    return await note.save();
  }

  async updateNote(id, data) {
    return await Note.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteNote(id) {
    return await Note.findByIdAndDelete(id);
  }
}

module.exports = new NoteRepository();