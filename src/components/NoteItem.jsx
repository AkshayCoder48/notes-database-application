import React from 'react';

const NoteItem = ({ note }) => {
  return (
    <div className="note-item">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
    </div>
  );
};

export default NoteItem;