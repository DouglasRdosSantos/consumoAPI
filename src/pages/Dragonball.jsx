import { Link } from "react-router";

function Dragonball() {
  return (
    <section>
      <Link to="/" className="botao">← Voltar</Link>
      <h1>Dragon Ball</h1>
      <p>Em breve: personagens de Dragon Ball.</p>
    </section>
  );
}

export default Dragonball;
