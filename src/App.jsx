import "./App.css";
import { Route, Routes } from "react-router";
import Inicio from "./pages/Inicio";
import Filmes from "./pages/filmes";
import PokemonPage from "./pages/pokemon";
import Dragonball from "./pages/Dragonball";
import NaoEncontrada from "./componentes/NaoEncontrada";
import ThemeToggle from "./componentes/ThemeToggle";

function App() {
  return (
    <>
      <header className="menu">
        <ThemeToggle />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/pokemon" element={<PokemonPage />} />
          <Route path="/dragonball" element={<Dragonball />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
