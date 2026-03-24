import { useEffect, useState } from "react";

function Authors() {
  const [authors, setAuthors] = useState(() => {
    const saved = localStorage.getItem("authors");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    id: null,
    name: "",
    stack: "",
  });

  useEffect(() => {
    localStorage.setItem("authors", JSON.stringify(authors));
  }, [authors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveAuthor = (e) => {
    e.preventDefault();

    if (!form.name || !form.stack) {
      alert("Completa todos los campos");
      return;
    }

    if (form.id) {
      setAuthors((prev) =>
        prev.map((a) => (a.id === form.id ? form : a))
      );
    } else {
      setAuthors([...authors, { ...form, id: Date.now() }]);
    }

    setForm({ id: null, name: "", stack: "" });
  };

  const editAuthor = (author) => setForm(author);

  const deleteAuthor = (id) => {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="panel">
      <h2>Autores</h2>

      <form onSubmit={saveAuthor} className="form">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="stack"
          placeholder="Stack"
          value={form.stack}
          onChange={handleChange}
        />

        <button>{form.id ? "Actualizar" : "Guardar"}</button>
      </form>

      <div className="card-grid">
        {authors.map((a) => (
          <div key={a.id} className="card">
            <h3>{a.name}</h3>
            <p>{a.stack}</p>

            <button onClick={() => editAuthor(a)}>Editar</button>
            <button onClick={() => deleteAuthor(a.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;