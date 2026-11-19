import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useOnline from "../hooks/useOnline";

const POR_PAGINA = 12;

function urlDaPagina(pagina) {
  return `https://dragonball-api.com/api/characters?page=${pagina}&limit=${POR_PAGINA}`;
}

// Carrega uma imagem como se ela estivesse na tela, para o service worker
// guardá-la no cache de imagens (um fetch() comum não passaria por esse cache)
function carregarImagem(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });
}

// Com internet, baixa em segundo plano todas as páginas e imagens de
// personagens. O service worker guarda tudo, e a página inteira passa a
// funcionar offline. Roda uma vez só por visita ao app.
let jaGuardou = false;
// Último total de páginas recebido da API (usado na paginação quando dá erro)
let ultimoTotalPaginas = null;

async function guardarTodasAsPaginas(totalPaginas) {
  const semServiceWorker = !navigator.serviceWorker?.controller;
  const economiaDeDados = navigator.connection?.saveData;
  if (jaGuardou || semServiceWorker || economiaDeDados || !navigator.onLine) return;
  jaGuardou = true;

  try {
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      const resposta = await fetch(urlDaPagina(pagina));
      const dados = await resposta.json();
      await Promise.all(dados.items.map((personagem) => carregarImagem(personagem.image)));
    }
  } catch (error) {
    // Caiu a internet no meio: tenta de novo na próxima visita à página
    console.log("Não deu para guardar os personagens para offline: ", error);
    jaGuardou = false;
  }
}

// A API devolve os textos em inglês; traduzimos os mais comuns
const TRADUCOES = {
  Male: "Masculino",
  Female: "Feminino",
  Human: "Humano",
  Namekian: "Namekuseijin",
  Android: "Androide",
  "Frieza Race": "Raça de Freeza",
  God: "Deus",
  Angel: "Anjo",
  Evil: "Maligno",
  Unknown: "Desconhecido",
  "Z Fighter": "Guerreiro Z",
  Villain: "Vilão",
  "Army of Frieza": "Exército de Freeza",
  "Red Ribbon Army": "Exército Red Ribbon",
  Freelancer: "Independente",
  "Pride Troopers": "Tropas do Orgulho",
  Other: "Outro",
};

function traduzir(texto) {
  return TRADUCOES[texto] ?? texto;
}

// Cartões cinza no formato dos personagens, enquanto a página carrega
function GradeCarregando() {
  return (
    <ul className="personagens" aria-hidden="true">
      {Array.from({ length: POR_PAGINA }, (_, i) => (
        <li key={i} className="personagem personagem--carregando">
          <div className="personagem__imagem esqueleto" />
          <div className="personagem__info">
            <div className="esqueleto esqueleto-texto" />
            <div className="esqueleto esqueleto-texto" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function PersonagensDragonBall() {
  const [pagina, setPagina] = useState(1);
  const { data, loading, error } = useFetch(urlDaPagina(pagina));
  const online = useOnline();

  // Enquanto uma página carrega (ou dá erro), vale o último total conhecido
  const totalPaginas = data?.meta.totalPages ?? ultimoTotalPaginas;

  // Assim que sabemos quantas páginas existem, guardamos todas para offline
  useEffect(() => {
    if (!data) return;
    ultimoTotalPaginas = data.meta.totalPages;
    guardarTodasAsPaginas(data.meta.totalPages);
  }, [data]);

  function irPara(novaPagina) {
    setPagina(novaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="painel">
      <div className="painel__titulo">
        <h2>Personagens</h2>
        {data && <span className="selo">{data.meta.totalItems} personagens</span>}
      </div>

      <div aria-live="polite" aria-busy={loading}>
        {loading && <GradeCarregando />}

        {error && (
          <div className="aviso aviso--erro" role="alert">
            <span className="aviso__icone" aria-hidden="true">📡</span>
            <p>
              {online
                ? "Não foi possível carregar os personagens. Verifique sua conexão."
                : "Você está offline e esta página ainda não foi salva. Ela vai aparecer quando a internet voltar."}
            </p>
          </div>
        )}

        {data && (
          <ul className="personagens">
            {data.items.map((personagem) => (
              <li key={personagem.id} className="personagem">
                <div className="personagem__imagem">
                  <img src={personagem.image} alt={personagem.name} loading="lazy" />
                </div>

                <div className="personagem__info">
                  <h3 className="personagem__nome">{personagem.name}</h3>
                  <p className="personagem__raca">
                    {traduzir(personagem.race)} · {traduzir(personagem.gender)}
                  </p>

                  <dl className="personagem__dados">
                    <div>
                      <dt>Ki</dt>
                      <dd>{personagem.ki}</dd>
                    </div>
                    <div>
                      <dt>Ki máximo</dt>
                      <dd>{personagem.maxKi}</dd>
                    </div>
                  </dl>

                  <span className="selo selo--laranja">{traduzir(personagem.affiliation)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Fica visível mesmo com erro, para dar para voltar a uma página salva */}
      <nav className="paginacao" aria-label="Páginas de personagens">
        <button
          type="button"
          className="paginacao__botao"
          onClick={() => irPara(pagina - 1)}
          disabled={loading || pagina === 1}
        >
          ← Anterior
        </button>
        <span className="paginacao__atual">
          Página <strong>{pagina}</strong>
          {totalPaginas && <> de <strong>{totalPaginas}</strong></>}
        </span>
        <button
          type="button"
          className="paginacao__botao"
          onClick={() => irPara(pagina + 1)}
          disabled={loading || !totalPaginas || pagina >= totalPaginas}
        >
          Próxima →
        </button>
      </nav>
    </div>
  );
}

export default PersonagensDragonBall;
