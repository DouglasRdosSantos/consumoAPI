import { Link } from "react-router";

function NaoEncontrada() {
  return (
    <section className="nao-encontrada">
      <h1>404</h1>
      <p>Esta página não existe.</p>
      <Link to="/">Voltar para o início</Link>
    </section>
  );
}

export default NaoEncontrada;
