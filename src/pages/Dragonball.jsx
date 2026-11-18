import CabecalhoPagina from "../componentes/CabecalhoPagina";
import PersonagensDragonBall from "../componentes/PersonagensDragonBall";

function Dragonball() {
  return (
    <section className="pagina">
      <CabecalhoPagina
        titulo="Dragon Ball"
        subtitulo="Personagens do universo de Dragon Ball, com raça, ki e afiliação."
      />
      <PersonagensDragonBall />
    </section>
  );
}

export default Dragonball;
