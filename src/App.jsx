import "./App.css";
import { Route, Routes } from "react-router";
import Inicio from "./pages/Inicio";
import Filmes from "./pages/filmes";
import PokemonPage from "./pages/pokemon";
import Dragonball from "./pages/Dragonball";
import Menu from "./componentes/Menu";
import Footer from "./componentes/Footer";
import PwaStatus from "./componentes/PwaStatus";
import NaoEncontrada from "./componentes/NaoEncontrada";

function App() {
  return (
    <>
      <PwaStatus />
      <Menu />

      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/pokemon" element={<PokemonPage />} />
          <Route path="/dragonball" element={<Dragonball />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
