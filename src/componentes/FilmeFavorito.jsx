import useFetch from "../hooks/useFetch";

function FilmeFavorito() {
  const { data: filme, loading, error } = useFetch(
    "https://www.omdbapi.com/?t=Jurassic+Park&apikey=59ab1eb9",
  );

  if (loading) {
    return (
      <div className="painel destaque destaque--carregando" aria-busy="true">
        <div className="destaque__poster esqueleto" />
        <div className="destaque__info">
          <div className="esqueleto esqueleto-texto" />
          <div className="esqueleto esqueleto-texto" />
          <div className="esqueleto esqueleto-texto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aviso aviso--erro" role="alert">
        <span className="aviso__icone" aria-hidden="true">⚠️</span>
        <p>Não foi possível carregar o filme favorito.</p>
      </div>
    );
  }

  // Junta só as informações que a API trouxe (ela usa "N/A" quando não tem)
  const detalhes = [filme.Year, filme.Runtime, filme.Genre].filter(
    (info) => info && info !== "N/A",
  );

  return (
    <article className="painel destaque">
      <img
        src={filme.Poster}
        className="destaque__poster"
        alt={`Pôster de ${filme.Title}`}
      />

      <div className="destaque__info">
        <span className="selo">⭐ Meu filme favorito</span>
        <h2 className="destaque__titulo">{filme.Title}</h2>
        <p className="destaque__meta">{detalhes.join(" · ")}</p>
        {filme.Plot && filme.Plot !== "N/A" && (
          <p className="destaque__sinopse">{filme.Plot}</p>
        )}
        <p className="destaque__nota">
          <strong>{filme.imdbRating}</strong> /10 no IMDb
        </p>
      </div>
    </article>
  );
}

export default FilmeFavorito;
