import React from "react";
import { Link } from "react-router-dom";
const Home = ({notes}) => {
    return (
        <div>
        <h2 className="text-2xl font-bold mb-4">All Notes</h2>
<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {notes.map((note) => (
    <li key={note.id} className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
      <Link to={`/note/${note.id}`} className="text-white text-xl font-medium hover:underline">
        {note.title}
      </Link>
    </li>
  ))}
</ul>
        </div>
      );
};

export default Home;