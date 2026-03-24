import { useState } from "react";
import Authors from "./components/Author";
import Notes from "./components/Note";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("authors");

  return (
    <div className="app">
      <header className="header">
        <h1>Sistema de Notas</h1>
      </header>

      <div className="tabs">
        <button
          className={activeTab === "authors" ? "tab active" : "tab"}
          onClick={() => setActiveTab("authors")}
        >
          Autores
        </button>

        <button
          className={activeTab === "notes" ? "tab active" : "tab"}
          onClick={() => setActiveTab("notes")}
        >
          Notas
        </button>
      </div>

      <div className="content">
        {activeTab === "authors" && <Authors />}
        {activeTab === "notes" && <Notes />}
      </div>
    </div>
  );
}

export default App;