import React, { useState } from "react";

const Flashcards = ({ notes, updateNoteStatus }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const note = notes[current];

  const getProgress = () => {
    const knownCount = notes.filter((note) => note.status === "known").length;
    return ((knownCount / notes.length) * 100).toFixed(0); // rounded %
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % notes.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + notes.length) % notes.length);
    setFlipped(false);
  };

  const handleMarkAsKnown = () => {
    updateNoteStatus(note.id, "known");
  };

  const handleMarkAsReview = () => {
    updateNoteStatus(note.id, "to review");
  };

  if (notes.length === 0) {
    return <p className="text-white">No notes available for flashcards.</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${getProgress()}%` }}
        ></div>
      </div>
      <p className="text-white text-sm mb-4">
        Progress: {getProgress()}%
      </p>

      {/* Flashcard */}
      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? "flipped" : ""}`}>
          <div className="front">
            <p className="text-white text-xl font-bold">{note.title}</p>
          </div>
          <div className="back overflow-y-auto">
            <p className="text-base text-white whitespace-pre-wrap">{note.content}</p>
          </div>
        </div>
      </div>

      {/* Show Current Status */}
      <p className="text-white text-sm italic">
        Status: {note.status === "known" ? "Completed" : note.status === "to review" ? "To Review" : "Unreviewed"}
      </p>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handlePrev}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Marking Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleMarkAsKnown}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Mark as Known
        </button>
        <button
          onClick={handleMarkAsReview}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Mark as To Review
        </button>
      </div>

      {/* Current Card Info */}
      <p className="text-white text-sm opacity-70 mt-2">
        Card {current + 1} of {notes.length}
      </p>
    </div>
  );
};

export default Flashcards;
