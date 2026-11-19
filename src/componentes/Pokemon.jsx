import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import useOnline from "../hooks/useOnline";

// A PokéAPI tem 1025 Pokémon na lista principal (IDs de 1 a 1025)
const TOTAL_POKEMON = 1025;

// Mesmo nome de cache usado no vite.config.js (runtimeCaching da pokeapi.co)
const CACHE_POKEAPI = "pokeapi";

// Sorteia um ID e busca o Pokémon na API
async function buscarNaApi() {
  const id = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
}

// Sem internet: sorteia entre os Pokémon que o service worker já guardou.
// Evita repetir o que está na tela, se houver outro salvo.
async function sortearDoCache(idAtual) {
  if (!("caches" in window)) return null;

  const cache = await caches.open(CACHE_POKEAPI);
  const salvos = (await cache.keys()).filter((pedido) =>
    /\/api\/v2\/pokemon\/\d+\/?$/.test(new URL(pedido.url).pathname),
  );
  if (salvos.length === 0) return null;

  const outros = salvos.filter((pedido) => !pedido.url.endsWith(`/${idAtual}`));
  const opcoes = outros.length > 0 ? outros : salvos;
  const escolhido = opcoes[Math.floor(Math.random() * opcoes.length)];
  const resposta = await cache.match(escolhido);

  return { dados: await resposta.json(), totalSalvos: salvos.length };
}

// Tenta a API; se não houver internet (ou ela falhar), usa os salvos
async function buscarPokemonAleatorio(idAtual) {
  if (navigator.onLine) {
    try {
      return { dados: await buscarNaApi(), totalSalvos: null };
    } catch (error) {
      console.log("API indisponível, tentando os Pokémon salvos: ", error);
    }
  }

  const salvo = await sortearDoCache(idAtual);
  if (salvo) return salvo;
  throw new Error("Sem internet e sem Pokémon salvos");
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
  // Quando o sorteio veio dos salvos, guarda quantos existem (para o aviso)
  const [totalSalvos, setTotalSalvos] = useState(null);
  const idAtual = useRef(null);
  const online = useOnline();

  useEffect(() => {
    // Se o componente sair da tela (ou um novo sorteio começar),
    // ignoramos a resposta antiga para não sobrescrever a nova
    let cancelado = false;

    buscarPokemonAleatorio(idAtual.current)
      .then(({ dados, totalSalvos }) => {
        if (cancelado) return;
        idAtual.current = dados.id;
        setPoke(dados);
        setTotalSalvos(totalSalvos);
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
    <div id="docs" className="painel encontro">
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
            {online ? (
              <>
                <p>Não foi possível encontrar um Pokémon.</p>
                <p>Verifique sua conexão e tente de novo.</p>
              </>
            ) : (
              <>
                <p>Você está offline e ainda não há Pokémon salvos.</p>
                <p>Encontre alguns com internet para jogar offline depois.</p>
              </>
            )}
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

      {status === "success" && totalSalvos !== null && (
        <p className="aviso-offline">
          📴 Sem internet: sorteando entre os {totalSalvos}{" "}
          {totalSalvos === 1 ? "Pokémon já encontrado" : "Pokémon já encontrados"}.
        </p>
      )}

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
