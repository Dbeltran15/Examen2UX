import { useEffect, useState } from "react";

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [authors, setAuthors] = useState([]);

  const [form, setForm] = useState({
    id: null,
    title: "",
    content: "",
    priority: "Media",
    authorId: "",
  });

  useEffect(() => {
    const savedAuthors = localStorage.getItem("authors");
    if (savedAuthors) setAuthors(JSON.parse(savedAuthors));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveNote = (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.authorId) {
      alert("Completa todos los campos");
      return;
    }

    if (form.id) {
      setNotes((prev) =>
        prev.map((n) => (n.id === form.id ? form : n))
      );
    } else {
      setNotes([...notes, { ...form, id: Date.now() }]);
    }

    setForm({
      id: null,
      title: "",
      content: "",
      priority: "Media",
      authorId: "",
    });
  };

  const editNote = (note) => setForm(note);

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const getAuthorName = (id) => {
    const author = authors.find((a) => a.id == id);
    return author ? author.name : "Sin autor";
  };

  return (
    <div className="panel">
      <h2>Notas</h2>

      <form onSubmit={saveNote} className="form">
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Contenido"
          value={form.content}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option>Alta</option>
          <option>Media</option>
          <option>Baja</option>
        </select>

        <select
          name="authorId"
          value={form.authorId}
          onChange={handleChange}
        >
          <option value="">Seleccionar autor</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <button>{form.id ? "Actualizar" : "Guardar"}</button>
      </form>

      <div className="card-grid">
        {notes.map((n) => (
          <div key={n.id} className="card">
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <p><strong>Prioridad:</strong> {n.priority}</p>
            <p><strong>Autor:</strong> {getAuthorName(n.authorId)}</p>

            <button onClick={() => editNote(n)}>Editar</button>
            <button onClick={() => deleteNote(n.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;