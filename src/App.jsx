import "./App.css";
import Header from "./componentes/Header";
import Perfil from "./componentes/Perfil";
import Pokemon from "./componentes/Pokemon";
import FilmeFavorito from "./componentes/FilmeFavorito";
import MovieEe from "./componentes/MovieEe";
import Footer from "./componentes/Footer";
import PwaStatus from "./componentes/PwaStatus";

function App() {
  return (
    <>
      <PwaStatus />
        <MovieEe />

      <main>
        <Perfil />

        <div className="ticks"></div>

        <section id="next-steps">
          <FilmeFavorito />
          <Pokemon />
        </section>

        <div className="ticks"></div>

        <section id="busca">
          
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
