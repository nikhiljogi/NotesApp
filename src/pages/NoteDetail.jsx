import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const NoteDetail = ({ notes, deleteNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((n) => n.id === id);

  if (!note) return <p>Note not found.</p>;

  const handleDelete = () => {
    deleteNote(id);
    navigate("/");
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
      <p className="mb-4 text-white/90">{note.content}</p>
      <p className="text-sm text-white/60 mb-4">{note.date}</p>
      <div className="flex space-x-4 mb-4">
        <Link
          to={`/edit/${note.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Delete
        </button>
      </div>
      <Link to="/" className="text-blue-400 hover:underline">← Back to Home</Link>
    </div>
  );
};

export default NoteDetail;
