import React from 'react';
import { useRouter } from 'react-router-dom';
import { Note } from '../hooks/useNotes';

interface NotesListProps {
  notes: Note[];
}

export const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const router = useRouter();

  const handleEditNote = (noteId: string) => {
    router.push(`/notes/${noteId}/edit`);
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      // Logic to delete note would be handled by useNotes hook
      console.log('Deleting note:', noteId);
    }
  };

  if (notes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No notes yet. Create your first note!</h2>
        <button onClick={() => router.push('/notes/new')} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Create Note
        </button>
      </div>
    );
  }

  return (
    <div className="notes-list-container">
      <div className="notes-header">
        <h2>All Notes</h2>
        <button onClick={() => router.push('/notes/new')} className="btn-create">
          Create New Note
        </button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-header">
              <h3>{note.title}</h3>
              <div className="note-actions">
                <button onClick={() => handleEditNote(note.id)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => handleDeleteNote(note.id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
              <span className="note-date">Created: {note.createdAt.toLocaleDateString()}</span>
              <span className="note-date">Updated: {note.updatedAt.toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles for the notes list
const styles = `
  .notes-list-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .btn-create {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }

  .btn-create:hover {
    background-color: #218838;
  }

  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .note-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .note-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  .note-actions {
    display: flex;
    gap: 8px;
  }

  .btn-edit, .btn-delete {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  .btn-edit {
    background-color: #17a2b8;
    color: white;
  }

  .btn-edit:hover {
    background-color: #138496;
  }

  .btn-delete {
    background-color: #dc3545;
    color: white;
  }

  .btn-delete:hover {
    background-color: #c82333;
  }

  .note-content {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }

  .note-footer {
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid #eee;
    font-size: 12px;
    color: #999;
  }

  .note-date {
    display: block;
    margin-bottom: 4px;
  }
`;

  // Inject styles
  if (typeof window !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
};
