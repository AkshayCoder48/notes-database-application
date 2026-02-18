import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onNoteSelect, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const results = notes.filter(note =>
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(results);
  }, [notes, searchTerm]);

  const handleDelete = async (noteId) => {
    if (window