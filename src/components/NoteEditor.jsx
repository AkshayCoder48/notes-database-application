import React, { useState, useEffect } from 'react';

const NoteEditor = ({ onSave, initialContent }) => {
  const [content, setContent] = useState(initialContent || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

  const handleSave = async () => {
    if (!content.trim()) {
      alert('Note content cannot be empty');
      return;
    }
    setIsSaving(true);
    try {
      await onSave(content);
      setIsSaving(false);
    } catch (error) {
      console.error('Failed to save note:', error);
      setIsSaving(false);
      alert('Failed to save note. Please try again.');
    }
  };

  return (
    <div className="note-editor">
      <h2>Create/Edit Note</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note here..."
        rows={10}
        cols={50}
      />
      <div className="editor-actions">
        <button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Note'}
        </button>
        <button onClick={() => setContent('')}>Clear</button>
      </div>
    </div>
  );
};

export default NoteEditor;