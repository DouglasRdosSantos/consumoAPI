import { useEffect, useState } from "react";

function Header() {
  const [text, setText] = useState(localStorage.getItem("easy-input") || "");

  useEffect(() => {
    localStorage.setItem("easy-input", text);
  }, [text]);

  return (
    <header id="header">
      <h2>Consumo de APIs</h2>
      <div className="search">
        <label htmlFor="filme">Digite o nome de um filme: </label>
        <input
          id="filme"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite o nome do filme:"
        />
        <button onClick={() => localStorage.setItem("easy-input", text)}>
          Enviar
        </button>
      </div>
    </header>
  );
}

export default Header;
