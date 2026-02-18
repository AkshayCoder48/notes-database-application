import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import useNotes from './hooks/useNotes';
import './App.css';

const App = () => {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { notes, loading, error, searchNotes } = useNotes();

  React.useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const handleSearch = (query) => {
    const results = searchNotes(query);
    setFilteredNotes(results);
  };

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="app">
      <h1>Notes App</h1>
      <SearchBar onSearch={handleSearch} />
      <NoteList notes={filteredNotes} />
    </div>
  );
};

export default App;