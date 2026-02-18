import { useEffect, useState } from 'react';
import { usePuter } from 'puter';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const puter = usePuter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const keys = await puter.kv.list();
        const noteKeys = keys.filter((key) => key.startsWith('note:'));
        
        const fetchedNotes: Note[] = [];
        for (const key of noteKeys) {
          const noteData = await puter.kv.get(key);
          if (noteData) {
            const note: Note = JSON.parse(noteData);
            fetchedNotes.push(note);
          }
        }

        // Sort by creation date (newest first)
        fetchedNotes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setNotes(fetchedNotes);
      } catch (err) {
        setError('Failed to fetch notes. Please try again.');
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [puter]);

  const addNote = async (note: Note) => {
    try {
      await puter.kv.set(`note:${note.id}`, JSON.stringify(note));
      setNotes((prevNotes) => [note, ...prevNotes]);
    } catch (err) {
      setError('Failed to add note. Please try again.');
      console.error('Error adding note:', err);
    }
  };

  const updateNote = async (updatedNote: Note) => {
    try {
      await puter.kv.set(`note:${updatedNote.id}`, JSON.stringify(updatedNote));
      setNotes((prevNotes) => 
        prevNotes.map((note) => 
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    } catch (err) {
      setError('Failed to update note. Please try again.');
      console.error('Error updating note:', err);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await puter.kv.delete(`note:${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error('Error deleting note:', err);
    }
  };

  return { notes, loading, error, addNote, updateNote, deleteNote };
};
