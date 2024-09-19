const noteRepository = require('../repositories/noteRepository');

class NoteService {
  async getAllNotes(userId) {
    try {
      const notes = await noteRepository.listNotes(userId);
      return { message: 'Notes fetched successfully', notes };
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      throw new Error(`Could not retrieve notes: ${error.message}`);
    }
  }

  async createNote(noteData, userId) {
    try {
      if (!noteData.title || !noteData.content) {
        throw new Error('Title and Content are required fields');
      }
      noteData.user = userId;
      const newNote = await noteRepository.createNote(noteData);
      return { message: 'Note created successfully', note: newNote };
    } catch (error) {
      console.error('Error creating note:', error.message);
      throw new Error(`Could not create note: ${error.message}`);
    }
  }

  async updateNote(id, data, userId) {
    try {
      const note = await noteRepository.findNoteById(id);
      if (!note || note.user.toString() !== userId) {
        throw new Error('Note not found or unauthorized');
      }
      const updatedNote = await noteRepository.updateNote(id, data);
      return { message: 'Note updated successfully', note: updatedNote };
    } catch (error) {
      console.error('Error updating note:', error.message);
      throw new Error(`Could not update note: ${error.message}`);
    }
  }

  async deleteNote(id, userId) {
    try {
      const note = await noteRepository.findNoteById(id);
      if (!note || note.user.toString() !== userId) {
        throw new Error('Note not found or unauthorized');
      }
      await noteRepository.deleteNote(id);
      return { message: 'Note deleted successfully' };
    } catch (error) {
      console.error('Error deleting note:', error.message);
      throw new Error(`Could not delete note: ${error.message}`);
    }
  }
}

module.exports = new NoteService();