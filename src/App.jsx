import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import NoteDetail from "./pages/NoteDetail";
import EditNote from "./pages/EditNote"; // ← NEW
import Flashcards from "./pages/Flashcards"; // ← new

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes((prev) => [...prev, { ...note, id: Date.now().toString(), status: 'unreviewed' }]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const editNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const updateNoteStatus = (id, status) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, status } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div className="p-4">
      <nav className="mb-6 flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
        <Link to="/" className="text-white font-semibold hover:underline">Home</Link>
        <Link to="/add" className="text-white font-semibold hover:underline">Add Note</Link>
        <Link to="/flashcards" className="text-white font-semibold hover:underline">Flashcards</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home notes={notes} />} />
        <Route path="/add" element={<AddNote addNote={addNote} />} />
        <Route path="/note/:id" element={<NoteDetail notes={notes} deleteNote={deleteNote} />} />
        <Route path="/edit/:id" element={<EditNote notes={notes} editNote={editNote} />} /> {/* ← NEW */}
        <Route
          path="/flashcards"
          element={<Flashcards notes={notes} updateNoteStatus={updateNoteStatus} />}
        />
      </Routes>
    </div>
  );
}

export default App;
