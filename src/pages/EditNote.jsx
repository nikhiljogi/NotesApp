import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNote = ({ notes, editNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noteToEdit = notes.find((n) => n.id === id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  if (!noteToEdit) return <p className="text-white">Note not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    editNote({ ...noteToEdit, title, content });
    navigate(`/note/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2">Edit Note</h2>
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
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
        Save Changes
      </button>
    </form>
  );
};

export default EditNote;
