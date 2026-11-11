import "./PokemonCard.css";

// Cor de cada tipo de Pokémon. O card usa a cor do tipo principal.
const CORES_POR_TIPO = {
  normal: "#a8a77a",
  fire: "#ee8130",
  water: "#6390f0",
  electric: "#f7d02c",
  grass: "#7ac74c",
  ice: "#96d9d6",
  fighting: "#c22e28",
  poison: "#a33ea1",
  ground: "#e2bf65",
  flying: "#a98ff3",
  psychic: "#f95587",
  bug: "#a6b91a",
  rock: "#b6a136",
  ghost: "#735797",
  dragon: "#6f35fc",
  dark: "#705746",
  steel: "#b7b7ce",
  fairy: "#d685ad",
};

// Valor máximo de cada atributo na PokéAPI, usado para desenhar as barras
const MAXIMO_ATRIBUTO = 255;

function Atributo({ rotulo, valor }) {
  const porcentagem = Math.min((valor / MAXIMO_ATRIBUTO) * 100, 100);

  return (
    <div className="pokemon-card__atributo">
      <dt>{rotulo}</dt>
      <dd>
        <span className="pokemon-card__valor">{valor}</span>
        <span className="pokemon-card__barra" aria-hidden="true">
          <span style={{ width: `${porcentagem}%` }} />
        </span>
      </dd>
    </div>
  );
}

// Card encapsulado: recebe tudo por props e não sabe nada da API
function PokemonCard({ numero, nome, imagem, tipos, vida, ataque }) {
  const tipoPrincipal = tipos[0];
  const corDoTipo = CORES_POR_TIPO[tipoPrincipal] ?? CORES_POR_TIPO.normal;

  return (
    <article
      className="pokemon-card"
      // Renderização condicional de estilo: a variável CSS muda conforme o tipo
      style={{ "--cor-tipo": corDoTipo }}
      data-tipo={tipoPrincipal}
    >
      <header className="pokemon-card__topo">
        <h3 className="pokemon-card__nome">{nome}</h3>
        {numero && <span className="pokemon-card__numero">#{numero}</span>}
      </header>

      <div className="pokemon-card__imagem">
        {imagem ? (
          <img src={imagem} alt={nome} loading="lazy" />
        ) : (
          <span>Sem imagem</span>
        )}
      </div>

      <ul className="pokemon-card__tipos">
        {tipos.map((tipo) => (
          <li
            key={tipo}
            style={{ "--cor-badge": CORES_POR_TIPO[tipo] ?? CORES_POR_TIPO.normal }}
          >
            {tipo}
          </li>
        ))}
      </ul>

      <dl className="pokemon-card__atributos">
        <Atributo rotulo="Vida" valor={vida} />
        <Atributo rotulo="Ataque" valor={ataque} />
      </dl>
    </article>
  );
}

export default PokemonCard;
