import { writeFile, readFile, kvStorage } from 'puterjs';

const NOTES_FILE = 'notes.json';

export const NoteService = {
  async getNotes() {
    try {
      const notesData = await readFile(NOTES_FILE);
      if (notesData) {
        return JSON.parse(notesData);
      }
      return [];
    } catch (error) {
      console.error('Error reading notes:', error);
      return [];
    }
  },

  async saveNote(content) {
    const notes = await this.getNotes();
    const newNote = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    notes.push(newNote);
    await this._saveAllNotes(notes);
    return newNote;
  },

  async updateNote(id, content) {
    const notes = await this.getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    notes[noteIndex] = {
      ...notes[noteIndex],
      content,
      updatedAt: new Date().toISOString()
    };
    await this._saveAllNotes(notes);
    return notes[noteIndex];
  },

  async deleteNote(id) {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    await this._saveAllNotes(filteredNotes);
    return filteredNotes;
  },

  async _saveAllNotes(notes) {
    try {
      await writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
      await kvStorage.set('notes_last_updated', Date.now().toString());
    } catch (error) {
      console.error('Error saving notes:', error);
      throw error;
    }
  },

  async getNoteById(id) {
    const notes = await this.getNotes();
    return notes.find(note => note.id === id);
  },

  async getNotesCount() {
    const notes = await this.getNotes();
    return notes.length;
  },

  async getLastUpdated() {
    const lastUpdated = await kvStorage.get('notes_last_updated');
    return lastUpdated ? new Date(parseInt(lastUpdated)).toISOString() : null;
  }
};