import { Link } from "react-router";
import FilmeFavorito from "../componentes/FilmeFavorito";

function Filmes() {
  return (
    <section>
      <Link to="/" className="botao">← Voltar</Link>
      <h1>Filmes</h1>
      <FilmeFavorito />
    </section>
  );
}

export default Filmes;
