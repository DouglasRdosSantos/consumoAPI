import useFetch from "../hooks/useFetch";

function Perfil() {
  const perfil = useFetch("https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/47");
  const dbz = useFetch("https://dragonball-api.com/api/characters/18");

  // Enquanto carrega: blocos no formato do conteúdo, para a tela não "pular"
  if (perfil.loading || dbz.loading) {
    return (
      <section className="hero hero--carregando" aria-busy="true">
        <div className="hero__figura esqueleto" />
        <div className="hero__texto">
          <div className="esqueleto esqueleto-linha" />
          <div className="esqueleto esqueleto-titulo" />
          <div className="esqueleto esqueleto-linha" />
        </div>
      </section>
    );
  }

  if (perfil.error || dbz.error) {
    return (
      <div className="aviso aviso--erro" role="alert">
        <span className="aviso__icone" aria-hidden="true">⚠️</span>
        <p>Não foi possível carregar o perfil. Verifique sua conexão.</p>
      </div>
    );
  }

  return (
    <section className="hero">
      <div className="hero__figura">
        <img src={dbz.data.image} alt={dbz.data.name} />
      </div>

      <div className="hero__texto">
        <span className="selo">👋 Olá, eu sou</span>
        <h1 className="hero__nome">{perfil.data.nome}</h1>
        <p className="hero__descricao">
          Este projeto consome APIs públicas com React: busque filmes, encontre
          Pokémon e conheça os personagens de Dragon Ball.
        </p>
      </div>
    </section>
  );
}

export default Perfil;
