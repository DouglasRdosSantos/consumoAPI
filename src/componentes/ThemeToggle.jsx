import { useEffect, useState } from "react";

// Lê o tema que o script do index.html já aplicou
function temaInicial() {
  return document.documentElement.dataset.theme || "light";
}

function IconeSol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function IconeLua() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
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
  const rotulo = escuro ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      type="button"
      className="tema-toggle"
      onClick={() => setTema(escuro ? "light" : "dark")}
      aria-label={rotulo}
      title={rotulo}
    >
      {escuro ? <IconeSol /> : <IconeLua />}
    </button>
  );
}

export default ThemeToggle;
