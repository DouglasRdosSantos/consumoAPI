import CabecalhoPagina from "../componentes/CabecalhoPagina";
import Pokemon from "../componentes/Pokemon";

function PokemonPage() {
  return (
    <section className="pagina">
      <CabecalhoPagina
        titulo="Pokémon"
        subtitulo="Um Pokémon selvagem apareceu! Clique no botão para encontrar outro."
      />
      <Pokemon />
    </section>
  );
}

export default PokemonPage;
