import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";

const paginas = [
  { to: "/filmes", rotulo: "Filmes" },
  { to: "/pokemon", rotulo: "Pokémon" },
  { to: "/dragonball", rotulo: "Dragon Ball" },
];

// Barra fixa no topo: marca (volta ao início), links das páginas e tema
function Menu() {
  return (
    <header className="topo">
      <div className="topo__conteudo">
        <Link to="/" className="marca">
          <img src="/favicon_io/android-chrome-192x192.png" alt="" />
          ConsumoAPI
        </Link>

        <nav className="topo__nav" aria-label="Páginas">
          {paginas.map((pagina) => (
            <NavLink key={pagina.to} to={pagina.to}>
              {pagina.rotulo}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Menu;
