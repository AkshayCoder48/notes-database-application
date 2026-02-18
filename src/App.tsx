import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NoteForm } from './components/NoteForm';
import { useNotes } from './hooks/useNotes';
import { NotesList } from './components/NotesList';

function App() {
  const { notes, loading, error } = useNotes();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Note Manager</h1>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />
            <Route path="/notes" element={<NotesList notes={notes} />} />
            <Route path="/notes/new" element={<NoteForm />} />
            <Route path="/notes/:id/edit" element={<NoteForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
