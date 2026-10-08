import useFetch from "../hooks/useFetch";

function FilmeFavorito() {
  const { data: filme, loading, error } = useFetch(
    "https://www.omdbapi.com/?t=Jurassic+Park&apikey=59ab1eb9",
  );

  if (loading) return <div id="social">Carregando...</div>;
  if (error) return <div id="social">Ocorreu um erro inesperado</div>;

  return (
    <div id="social">
      <h2>Meu filme favorito é: {filme.Title}</h2>
      <img
        src={filme.Poster}
        className="base"
        width="170"
        height="179"
        alt={filme.Title}
      />
      <p>Nota do IMDB: {filme.imdbRating}</p>
    </div>
  );
}

export default FilmeFavorito;
