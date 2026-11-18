import { Link } from "react-router";

// Topo de cada página: botão de voltar, título e uma frase explicando a página
function CabecalhoPagina({ titulo, subtitulo }) {
  return (
    <header className="cabecalho">
      <Link to="/" className="voltar">
        ← Voltar
      </Link>
      <h1>{titulo}</h1>
      {subtitulo && <p>{subtitulo}</p>}
    </header>
  );
}

export default CabecalhoPagina;
