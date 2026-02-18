# Note Manager

A simple note-taking application built with React, Vite, and Puter.js.

## Features

- Create, edit, and delete notes
- Real-time data persistence using Puter.js
- Search and filter notes
- Responsive design
- Clean, modern UI

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Puter.js** - File system and key-value storage
- **CSS** - Styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   bash
   npm install
   
3. Run the development server:
   bash
   npm run dev
   
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure


src/
├── App.jsx              # Main application component
├── components/          # Reusable components
│   ├── NoteList.jsx    # Note list display
│   └── NoteEditor.jsx  # Note creation/editing
├── App.css             # Global styles
├── index.jsx           # Application entry point
└── index.css           # Global CSS reset


## Functionality

### Add Note
- Click "Create New Note" to open the editor
- Enter a title and content
- Click "Save Note" to store the note

### Edit Note
- Click the "Edit" button on any note
- Modify the title or content
- Click "Save Note" to update

### Delete Note
- Click the "Delete" button on any note
- Confirm deletion
- Note is removed from storage

### Search/Filter
- Use the filter input to search notes by title or content
- Results update in real-time

## Data Persistence

Notes are stored using Puter.js key-value storage:
- Data is persisted locally in the browser
- Notes are automatically loaded on app start
- Changes are saved immediately

## Production Build

To create a production build:

bash
npm run build


This generates optimized assets in the `dist` folder.

## Development

This project uses Vite for fast development:
- Hot Module Replacement (HMR)
- Fast builds
- Optimized production builds

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT