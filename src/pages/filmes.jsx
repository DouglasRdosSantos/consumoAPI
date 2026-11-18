import CabecalhoPagina from "../componentes/CabecalhoPagina";
import FilmeFavorito from "../componentes/FilmeFavorito";
import MovieEe from "../componentes/MovieEe";

function Filmes() {
  return (
    <section className="pagina">
      <CabecalhoPagina
        titulo="Filmes"
        subtitulo="Pesquise filmes e séries na OMDb. Os resultados aparecem assim que você para de digitar."
      />
      <MovieEe />
      <FilmeFavorito />
    </section>
  );
}

export default Filmes;
