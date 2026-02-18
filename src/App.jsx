import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList.jsx';
import NoteForm from './components/NoteForm.jsx';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error