import { useState } from 'react';
import './NoteEditor.css';

const NoteEditor = ({ note, onSaveNote, onClose }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const updatedNote = {
        id: note?.id || Date.now().toString(),
        title,
        content,
        createdAt: note?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await onSaveNote(updatedNote);
    } catch (err) {
      setError('Failed to save note');
      console.error('Error saving note:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setError(null);
    onClose();
  };

  return (
    <div className="note-editor">
      <div className="editor-header">
        <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
        <button onClick={handleCancel} className="btn-close">
          Close
        </button>
      </div>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <form onSubmit={handleSave} className="editor-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
          className="title-input"
        />
        <textarea
          placeholder="Note Content..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError(null);
          }}
          className="content-input"
        />
        <div className="editor-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="btn-save"
          >
            {saving ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;