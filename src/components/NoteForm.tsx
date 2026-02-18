import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { usePuter } from 'puter';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteFormProps {
  initialNote?: Note;
  onSubmit?: (note: Note) => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ initialNote, onSubmit }) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const puter = usePuter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const note: Note = {
        id: initialNote?.id || Date.now().toString(),
        title,
        content,
        createdAt: initialNote?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      // Save to Puter.js
      await puter.kv.set(`note:${note.id}`, JSON.stringify(note));
      
      // Optionally save to file for backup
      await puter.fs.writeFile(`./data/notes/${note.id}.json`, JSON.stringify(note));

      if (onSubmit) {
        onSubmit(note);
      }

      router.push('/notes');
    } catch (err) {
      setError('Failed to save note. Please try again.');
      console.error('Error saving note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (onSubmit) {
      onSubmit(initialNote || { id: '', title: '', content: '', createdAt: new Date(), updatedAt: new Date() });
    }
    router.push('/notes');
  };

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content..."
            className="form-control textarea"
            rows={10}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={isSaving} className="btn btn-primary">
            {isSaving ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Styles for the form
const styles = `
  .note-form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .note-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-weight: 600;
    color: #333;
  }

  .form-control, .textarea {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.2s;
  }

  .form-control:focus, .textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  .textarea {
    resize: vertical;
    min-height: 200px;
  }

  .error-message {
    padding: 12px;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    color: #721c24;
    font-size: 14px;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btn-primary {
    background-color: #007bff;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #0056b3;
  }

  .btn-primary:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #545b62;
  }
`;

  // Inject styles
  if (typeof window !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
};
