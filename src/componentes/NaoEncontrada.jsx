import { Link } from "react-router";

function NaoEncontrada() {
  return (
    <section className="nao-encontrada">
      <p className="nao-encontrada__codigo" aria-hidden="true">404</p>
      <h1>Página não encontrada</h1>
      <p>Esta página não existe ou mudou de endereço.</p>
      <Link to="/" className="botao">
        Voltar para o início
      </Link>
    </section>
  );
}

export default NaoEncontrada;
