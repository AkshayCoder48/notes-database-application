import { useState, useEffect } from 'react';
import { readFile, writeFile, kvStorage } from '../utils/storage';

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await readFile('notes.json');
        const parsedNotes = notesData ? JSON.parse(notesData) : [];
        setNotes(parsedNotes);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (note) => {
    try {
      const newNotes = [...notes, note];
      await writeFile('notes.json', JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (err) {
      setError(err);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const newNotes = notes.map((note) => 
        note.id === updatedNote.id ? updatedNote : note
      );
      await writeFile('notes.json', JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (err) {
      setError(err);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const newNotes = notes.filter((note) => note.id !== noteId);
      await writeFile('notes.json', JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (err) {
      setError(err);
    }
  };

  const searchNotes = (query) => {
    if (!query) return notes;
    return notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    searchNotes
  };
};

export default useNotes;