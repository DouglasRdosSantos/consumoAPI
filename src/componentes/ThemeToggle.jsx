import { useEffect, useState } from "react";

// Lê o tema que o script do index.html já aplicou
function temaInicial() {
  return document.documentElement.dataset.theme || "light";
}

function ThemeToggle() {
  const [tema, setTema] = useState(temaInicial);

  // Sempre que o tema muda: aplica no <html> e salva para a próxima visita
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    try {
      localStorage.setItem("tema", tema);
    } catch {
      // navegador sem localStorage: o tema só não fica salvo
    }
  }, [tema]);

  const escuro = tema === "dark";

  return (
    <button
      type="button"
      className="tema-toggle"
      onClick={() => setTema(escuro ? "light" : "dark")}
      aria-label={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {escuro ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}

export default ThemeToggle;
