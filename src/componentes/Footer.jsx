const apis = [
  { href: "https://www.omdbapi.com/", nome: "OMDb" },
  { href: "https://pokeapi.co/", nome: "PokéAPI" },
  { href: "https://web.dragonball-api.com/", nome: "Dragon Ball API" },
];

function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape__conteudo">
        <p>© {new Date().getFullYear()} · Consumo de APIs com React</p>
        <p>
          Dados de{" "}
          {apis.map((api, i) => (
            <span key={api.nome}>
              <a href={api.href} target="_blank" rel="noreferrer">
                {api.nome}
              </a>
              {i < apis.length - 2 ? ", " : i === apis.length - 2 ? " e " : ""}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
