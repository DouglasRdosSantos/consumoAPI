import { useState, useEffect } from 'react';

function MovieEe() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [query, setQuery] = useState('Avengers');
  const API_KEY = '59ab1eb9';

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setErro(false);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]); // Limpa se não encontrar nada
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setMovies([]); // Não mantém resultados da busca anterior
        setErro(true);
      } finally {
        setLoading(false);
      }
    };

    // Usando debounce com setTimeout para evitar disparar a API a cada tecla digitada
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        getData();
      } else {
        setMovies([]); // Limpa a lista se a busca estiver vazia
        setErro(false);
      }
    }, 800);

    // Função de limpeza (cleanup) do useEffect.
    // Ela cancela o timeout anterior caso o usuário digite novamente antes de 800ms.
    return () => clearTimeout(delayDebounceFn);
  }, [query]); // Executa sempre que a 'query' for alterada

  return (
    <div className="card">
      <h2>Nível Médio: Consumo de API OMDb com Debounce</h2>
      <p>Busca filmes assim que você para de digitar.</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filme..."
      />

      {loading && <p>Carregando filmes...</p>}

      {!loading && movies.length > 0 && (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <strong>{movie.Title}</strong> ({movie.Year})
            </li>
          ))}
        </ul>
      )}

      {!loading && erro && (
        <p>Não foi possível buscar. Verifique sua conexão.</p>
      )}

      {!loading && !erro && movies.length === 0 && (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}

export default MovieEe;