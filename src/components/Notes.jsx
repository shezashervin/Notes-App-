import { useState, useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const addNote = () => {
    const note = { title, desc, cat };

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = note;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, note]);
    }

    setTitle("");
    setDesc("");
    setCat("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setTitle(notes[index].title);
    setDesc(notes[index].desc);
    setCat(notes[index].cat);
    setEditIndex(index);
  };

  const filteredNotes =
    filter === "All"
      ? notes
      : notes.filter((note) => note.cat === filter);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded shadow">

        <h1 className="text-2xl font-semibold text-gray-100 mb-4">
          Notes App
        </h1>

        {/* Form */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            className="bg-gray-700 border border-gray-600 text-white p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="bg-gray-700 border border-gray-600 text-white p-2 rounded"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <select
            className="bg-gray-700 border border-gray-600 text-white p-2 rounded"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={addNote}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <select
            className="bg-gray-700 border border-gray-600 text-white p-2 rounded"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full border border-gray-700 text-center text-gray-200">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 p-2">Title</th>
              <th className="border border-gray-600 p-2">Description</th>
              <th className="border border-gray-600 p-2">Category</th>
              <th className="border border-gray-600 p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredNotes.map((note, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="border border-gray-600 p-2">{note.title}</td>
                <td className="border border-gray-600 p-2">{note.desc}</td>
                <td className="border border-gray-600 p-2">{note.cat}</td>
                <td className="border border-gray-600 p-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded mr-2"
                    onClick={() => editNote(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => deleteNote(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Notes;