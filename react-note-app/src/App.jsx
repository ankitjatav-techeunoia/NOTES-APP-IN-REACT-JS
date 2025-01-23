import React, { useState, useEffect } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load notes and theme from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  const addNote = () => {
    if (noteInput.trim()) {
      if (editIndex !== null) {
        // Edit existing note
        const newNotes = [...notes];
        newNotes[editIndex] = noteInput.trim();
        setNotes(newNotes);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        setEditIndex(null);
      } else {
        // Add new note
        const newNotes = [...notes, noteInput.trim()];
        setNotes(newNotes);
        localStorage.setItem('notes', JSON.stringify(newNotes));
      }
      setNoteInput('');
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
    if (editIndex === index) {
      setEditIndex(null);
      setNoteInput('');
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setNoteInput(notes[index]);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setNoteInput('');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-gray-100 to-white text-gray-900'} flex flex-col items-center justify-start p-8`}>
      <div className="w-full max-w-lg flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Notes App
        </h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'} font-semibold transition-colors cursor-pointer`}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      <div className="w-full max-w-lg mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            className={`flex-1 p-3 rounded-lg border-2 ${isDarkMode ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:outline-none focus:border-blue-500 transition-colors`}
            placeholder="Write your note here..."
          />
          <button 
            onClick={addNote} 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg cursor-pointer"
          >
            {editIndex !== null ? 'Save Edit' : 'Add Note'}
          </button>
          {editIndex !== null && (
            <button 
              onClick={cancelEdit}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <ul className="w-full max-w-lg space-y-4">
        {notes.map((note, index) => (
          <li 
            key={index} 
            className={`group flex justify-between items-center ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-300'} backdrop-blur-sm p-4 rounded-lg border hover:border-gray-600 transition-all shadow-lg`}
          >
            <span className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>{note}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => startEdit(index)}
                className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/20 transition-all duration-200 cursor-pointer"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteNote(index)} 
                className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
