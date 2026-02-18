import { useState, useEffect } from 'react';
import { readFile, writeFile, kvStorage } from 'puter-js';

const DisplaySavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const notesData = await kvStorage.get('notes');
      if (notesData) {
        setNotes(JSON.parse(notesData));
      } else {
        setNotes([]);
      }
    } catch (err) {
      setError('Failed to load notes');
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      const notesData = await kvStorage.get('notes');
      if (notesData) {
        const notesArray = JSON.parse(notesData);
        const updatedNotes = notesArray.filter(note => note.id !== id);
        await kvStorage.set('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
      }
    } catch (err) {
      setError('Failed to delete note');
      console.error('Error deleting note:', err);
    }
  };

  const editNote = (id) => {
    // Navigate to edit page or open modal for editing
    console.log('Edit note with id:', id);
  };

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Saved Notes</h1>
      {notes.length === 0 ? (
        <div>No notes available. Create your first note!</div>
      ) : (
        <div>
          {notes.map((note) => (
            <div key={note.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => editNote(note.id)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplaySavedNotes;