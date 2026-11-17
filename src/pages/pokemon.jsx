import { Link } from "react-router";
import Pokemon from "../componentes/Pokemon";

function PokemonPage() {
  return (
    <section>
      <Link to="/" className="botao">← Voltar</Link>
      <h1>Pokémon</h1>
      <Pokemon />
    </section>
  );
}

export default PokemonPage;
