import "./App.css";
import { NavLink, Route, Routes } from "react-router";
import Perfil from "./componentes/Perfil";
import Pokemon from "./componentes/Pokemon";
import FilmeFavorito from "./componentes/FilmeFavorito";
import MovieEe from "./componentes/MovieEe";
import Footer from "./componentes/Footer";
import PwaStatus from "./componentes/PwaStatus";
import NaoEncontrada from "./componentes/NaoEncontrada";
import ThemeToggle from "./componentes/ThemeToggle";

function Inicio() {
  return (
    <>
      <Perfil />
      <div className="ticks"></div>
      <section id="next-steps">
        <FilmeFavorito />
        <Pokemon />
      </section>
    </>
  );
}

function App() {
  return (
    <>
      <PwaStatus />

      <nav className="menu">
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/filmes">Buscar filmes</NavLink>
        <ThemeToggle />
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/filmes" element={<MovieEe />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
