import { useState, useEffect } from 'react';

const API_KEY = '59ab1eb9';

// A OMDb devolve o tipo em inglês
const TIPOS = { movie: 'Filme', series: 'Série', episode: 'Episódio', game: 'Jogo' };

function IconeLupa() {
  return (
    <svg className="campo-busca__icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

// Pôster do filme. A OMDb às vezes manda um link que não existe mais (ou "N/A").
// Então tentamos em ordem: o link da busca, depois a API de pôsteres da própria
// OMDb pelo código do IMDb. Se nenhum carregar, mostra um ícone.
function PosterFilme({ src, imdbID, titulo }) {
  const fontes = [
    src !== 'N/A' && src,
    `https://img.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`,
  ].filter(Boolean);
  const [tentativa, setTentativa] = useState(0);

  if (tentativa >= fontes.length) {
    return <span className="filme__sem-poster" aria-hidden="true">🎬</span>;
  }

  return (
    <img
      src={fontes[tentativa]}
      alt={`Pôster de ${titulo}`}
      loading="lazy"
      onError={() => setTentativa((t) => t + 1)}
    />
  );
}

// Cartões cinza no formato dos pôsteres, mostrados enquanto a busca carrega
function GradeCarregando() {
  return (
    <ul className="filmes-grade" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i} className="filme filme--carregando">
          <div className="filme__poster esqueleto" />
          <div className="esqueleto esqueleto-texto" />
          <div className="esqueleto esqueleto-texto" />
        </li>
      ))}
    </ul>
  );
}

function MovieEe() {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [buscado, setBuscado] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [query, setQuery] = useState('Avengers');

  useEffect(() => {
    // Ignora a resposta de uma busca antiga se o usuário já digitou outra coisa
    let ativo = true;

    const getData = async () => {
      setLoading(true);
      setErro(false);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await response.json();
        if (!ativo) return;

        if (data.Response === 'True') {
          setMovies(data.Search);
          setTotal(Number(data.totalResults));
        } else {
          setMovies([]); // Limpa se não encontrar nada
          setTotal(0);
        }
        setBuscado(query);
      } catch (error) {
        if (!ativo) return;
        console.error("Erro ao buscar filmes:", error);
        setMovies([]); // Não mantém resultados da busca anterior
        setErro(true);
      } finally {
        if (ativo) setLoading(false);
      }
    };

    // Usando debounce com setTimeout para evitar disparar a API a cada tecla digitada
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        getData();
      } else {
        setMovies([]); // Limpa a lista se a busca estiver vazia
        setTotal(0);
        setBuscado('');
        setErro(false);
      }
    }, 800);

    // Função de limpeza (cleanup) do useEffect.
    // Ela cancela o timeout anterior caso o usuário digite novamente antes de 800ms.
    return () => {
      ativo = false;
      clearTimeout(delayDebounceFn);
    };
  }, [query]); // Executa sempre que a 'query' for alterada

  return (
    <div className="painel busca">
      <div className="painel__titulo">
        <h2>Buscar filmes</h2>
        <span className="selo">Busca com debounce</span>
      </div>

      <div className="campo-busca">
        <label htmlFor="busca-filme" className="so-leitor">Buscar filme</label>
        <IconeLupa />
        <input
          id="busca-filme"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome de um filme ou série..."
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="campo-busca__limpar"
            onClick={() => setQuery('')}
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>

      <div aria-live="polite">
        {loading && <GradeCarregando />}

        {!loading && movies.length > 0 && (
          <>
            <p className="busca__info">
              Mostrando <strong>{movies.length}</strong> de <strong>{total}</strong> resultados para <strong>“{buscado}”</strong>
            </p>
            <ul className="filmes-grade">
              {movies.map((movie) => (
                <li key={movie.imdbID}>
                  <a
                    className="filme"
                    href={`https://www.imdb.com/title/${movie.imdbID}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="filme__poster">
                      <PosterFilme src={movie.Poster} imdbID={movie.imdbID} titulo={movie.Title} />
                    </div>
                    <h3 className="filme__titulo">{movie.Title}</h3>
                    <div className="filme__meta">
                      <span>{movie.Year}</span>
                      <span className="selo">{TIPOS[movie.Type] ?? movie.Type}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {!loading && erro && (
          <div className="aviso aviso--erro busca__info" role="alert">
            <span className="aviso__icone" aria-hidden="true">📡</span>
            <p>Não foi possível buscar. Verifique sua conexão.</p>
          </div>
        )}

        {!loading && !erro && movies.length === 0 && (
          <div className="aviso busca__info">
            <span className="aviso__icone" aria-hidden="true">🔍</span>
            <p>{query.trim() ? 'Nenhum filme encontrado.' : 'Digite o nome de um filme para começar.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieEe;
