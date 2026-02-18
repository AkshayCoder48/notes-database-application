# Note Manager

A simple note-taking application built with React, Vite, and Puter.js.

## Features

- Create, edit, and delete notes
- Persistent storage using Puter.js
- Responsive design
- Modern UI/UX

## Getting Started

1. Install dependencies:
   bash
   npm install
   

2. Run the development server:
   bash
   npm run dev
   

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

bash
npm run build


## Project Structure


├── src/
│   ├── components/          # React components
│   │   ├── NoteForm.tsx    # Form to create/edit notes
│   │   └── NotesList.tsx    # List of all notes
│   ├── hooks/              # Custom React hooks
│   │   └── useNotes.ts     # Hook for managing notes
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── vite.config.ts        # Vite configuration
└── package.json         # Dependencies and scripts


## Technologies Used

- **React 18**: Frontend framework
- **Vite**: Build tool and dev server
- **Puter.js**: Client-side storage and file system
- **React Router**: Client-side routing

## API Reference

### Note Structure

typescript
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}


### Available Hooks

- `useNotes()`: Manages notes state and CRUD operations
- `usePuter()`: Access to Puter.js storage

### Components

- `NoteForm`: Form for creating/editing notes
- `NotesList`: Displays list of all notes

## Browser Support

This application supports all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT License