import { useEffect, useState } from "react";
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
  // Cada vez que este número muda, o efeito abaixo faz um novo sorteio
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    // Se o componente sair da tela (ou um novo sorteio começar),
    // ignoramos a resposta antiga para não sobrescrever a nova
    let cancelado = false;

    buscarPokemonAleatorio()
      .then((dados) => {
        if (cancelado) return;
        setPoke(dados);
        setStatus("success");
      })
      .catch((error) => {
        if (cancelado) return;
        console.log("Erro ao buscar Pokémon: ", error);
        setStatus("error");
      });

    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  const carregando = status === "loading";

  function handleClick() {
    // Bloqueio: enquanto uma busca está rodando, novos cliques são ignorados
    if (carregando) return;
    setStatus("loading");
    setTentativa((t) => t + 1);
  }

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
