import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

// A PokéAPI tem 1025 Pokémon na lista principal (IDs de 1 a 1025)
const TOTAL_POKEMON = 1025;

// Sorteia um ID e busca o Pokémon na API
async function buscarPokemonAleatorio() {
  const id = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
}

// Pega o valor de um atributo (hp, attack...) na lista de stats da API
function valorDoAtributo(poke, nome) {
  return poke.stats.find((s) => s.stat.name === nome)?.base_stat ?? 0;
}

function Pokemon() {
  // Um único estado diz em que etapa estamos: "loading", "success" ou "error"
  const [status, setStatus] = useState("loading");
  const [poke, setPoke] = useState(null);

  // Marca se já existe uma requisição em andamento.
  // useRef muda na hora (o useState só muda no próximo render),
  // então bloqueia até cliques muito rápidos em sequência.
  const buscando = useRef(false);

  async function encontrar() {
    buscando.current = true;
    try {
      setPoke(await buscarPokemonAleatorio());
      setStatus("success");
    } catch (error) {
      console.log("Erro ao buscar Pokémon: ", error);
      setStatus("error");
    } finally {
      buscando.current = false;
    }
  }

  // Primeiro encontro: roda uma vez quando o componente aparece
  useEffect(() => {
    encontrar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick() {
    if (buscando.current) return; // já tem busca rodando: ignora o clique
    setStatus("loading");
    encontrar();
  }

  const carregando = status === "loading";

  return (
    <div id="docs" className="encontro">
      <h2>Random Encounter</h2>

      <div className="encontro__area" aria-live="polite" aria-busy={carregando}>
        {carregando && (
          <div className="encontro__carregando">
            <span className="encontro__pokebola" aria-hidden="true" />
            <p>Procurando um Pokémon selvagem...</p>
          </div>
        )}

        {status === "error" && (
          <div className="encontro__erro" role="alert">
            <p>Não foi possível encontrar um Pokémon.</p>
            <p>Verifique sua conexão e tente de novo.</p>
          </div>
        )}

        {status === "success" && poke && (
          <PokemonCard
            numero={poke.id}
            nome={poke.name}
            imagem={
              poke.sprites.other?.["official-artwork"]?.front_default ??
              poke.sprites.front_default
            }
            tipos={poke.types.map((t) => t.type.name)}
            vida={valorDoAtributo(poke, "hp")}
            ataque={valorDoAtributo(poke, "attack")}
          />
        )}
      </div>

      <button
        type="button"
        className="encontro__botao"
        onClick={handleClick}
        disabled={carregando}
      >
        {carregando
          ? "Procurando..."
          : status === "error"
            ? "Tentar de novo"
            : "Encontrar outro Pokémon"}
      </button>
    </div>
  );
}

export default Pokemon;
