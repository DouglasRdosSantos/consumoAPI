import "./App.css";
import Header from "./componentes/Header";
import Perfil from "./componentes/Perfil";
import Pokemon from "./componentes/Pokemon";
import FilmeFavorito from "./componentes/FilmeFavorito";
import MovieEe from "./componentes/MovieEe";
import Footer from "./componentes/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Perfil />

        <div className="ticks"></div>

        <section id="next-steps">
          <Pokemon />
          <FilmeFavorito />
        </section>

        <div className="ticks"></div>

        <section id="busca">
          <MovieEe />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
