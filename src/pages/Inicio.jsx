import { Link } from "react-router";
import Perfil from "../componentes/Perfil";

// Um cartão para cada página. A cor pinta a faixa, o ícone e o nome da API.
const atalhos = [
  {
    to: "/filmes",
    icone: "🎬",
    titulo: "Filmes",
    texto: "Pesquise qualquer filme ou série e veja o pôster de cada um.",
    api: "OMDb API",
    cor: "#7c3aed",
  },
  {
    to: "/pokemon",
    icone: "⚡",
    titulo: "Pokémon",
    texto: "Encontre um Pokémon selvagem sorteado entre mais de mil.",
    api: "PokéAPI",
    cor: "#ef4444",
  },
  {
    to: "/dragonball",
    icone: "🐉",
    titulo: "Dragon Ball",
    texto: "Conheça os personagens do universo de Dragon Ball.",
    api: "Dragon Ball API",
    cor: "#f59e0b",
  },
];

function Inicio() {
  return (
    <section className="inicio">
      <Perfil />

      <div className="atalhos">
        <h2>Escolha uma página</h2>

        {atalhos.map((atalho) => (
          <Link
            key={atalho.to}
            to={atalho.to}
            className="atalho"
            style={{ "--cor": atalho.cor }}
          >
            <span className="atalho__icone" aria-hidden="true">
              {atalho.icone}
            </span>
            <span className="atalho__titulo">{atalho.titulo}</span>
            <span>{atalho.texto}</span>
            <span className="atalho__api">{atalho.api}</span>
            <span className="atalho__seta" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Inicio;
