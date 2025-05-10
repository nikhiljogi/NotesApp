import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddNote = ({addNote}) => {
    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
 
    e.preventDefault();
    if (!title || !content) return;
    addNote({ title, content, date: new Date().toLocaleString() });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg max-w-xl mx-auto">
  <h2 className="text-2xl font-bold text-white mb-2">Add a New Note</h2>
  <div>
    <label className="block mb-1 text-white">Title</label>
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border w-full p-2 rounded bg-white/30 text-white placeholder-white/70 focus:outline-none"
      placeholder="Enter note title"
    />
  </div>
  <div>
    <label className="block mb-1 text-white">Content</label>
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="border w-full p-2 rounded bg-white/30 text-white placeholder-white/70 focus:outline-none"
      placeholder="Write your note..."
    />
  </div>
  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
    Add Note
  </button>
</form>
  );
}
export default AddNote;
