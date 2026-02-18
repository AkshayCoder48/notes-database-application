import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <div className="no-notes">No notes found.</div>
      ) : (
        notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))
      )}
    </div>
  );
};

export default NoteList;