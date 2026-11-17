import { Link } from "react-router";
import Perfil from "../componentes/Perfil";

function Inicio() {
  return (
    <section className="inicio">
      <Perfil />

      <h2>Escolha uma página</h2>

      <div className="inicio__botoes">
        <Link to="/filmes" className="botao">Filmes</Link>
        <Link to="/pokemon" className="botao">Pokémon</Link>
        <Link to="/dragonball" className="botao">Dragon Ball</Link>
      </div>
    </section>
  );
}

export default Inicio;
