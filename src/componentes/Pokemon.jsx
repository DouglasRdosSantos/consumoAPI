import useFetch from "../hooks/useFetch";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

function Pokemon() {
  const { data: poke, loading, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon/Pikachu",
  );

  if (loading) return <div id="docs">Carregando...</div>;
  if (error) return <div id="docs">Ocorreu um erro inesperado</div>;

  return (
    <div id="docs">
      <h2>{poke.species.name}</h2>
      <img
        src={poke.sprites.front_shiny}
        className="base"
        width="170"
        height="179"
        alt={poke.species.name}
      />
      <p>Meu Pet</p>
      <ul>
        <li>
          <a href="https://vite.dev/" target="_blank">
            <img className="logo" src={viteLogo} alt="" />
            Tipo: {poke.types[0].type.name}
          </a>
        </li>
        <li>
          <a href="https://react.dev/" target="_blank">
            <img className="button-icon" src={reactLogo} alt="" />
            Peso: {poke.weight}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pokemon;
