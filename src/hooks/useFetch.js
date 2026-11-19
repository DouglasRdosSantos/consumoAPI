import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useOnline from "./useOnline";

// Hook reutilizável: busca os dados de uma URL e controla loading/erro.
// Guarda junto a URL de onde veio a resposta: se a URL mudar (ex.: trocar de
// página), "loading" volta a ser true até a resposta nova chegar.
// Se a busca falhar por falta de internet, tenta de novo sozinho quando ela voltar.
function useFetch(url) {
  const [resultado, setResultado] = useState({ url: null, data: null, error: false });
  // Cópia do último resultado, para o efeito consultar sem precisar depender dele
  const ultimo = useRef(null);
  const online = useOnline();

  useEffect(() => {
    const anterior = ultimo.current;
    const jaTemEstaUrl = anterior?.url === url;
    // Mesma URL e já deu certo: nada a fazer. Sem internet: mantém o que tem.
    if (jaTemEstaUrl && (!anterior.error || !online)) return;

    // Ignora a resposta antiga se a URL mudar antes de ela chegar
    let ativo = true;

    function guardar(novo) {
      if (!ativo) return;
      ultimo.current = novo;
      setResultado(novo);
    }

    axios
      .get(url)
      .then((response) => guardar({ url, data: response.data, error: false }))
      .catch((error) => {
        if (ativo) console.log("Error: ", error);
        guardar({ url, data: null, error: true });
      });

    return () => {
      ativo = false;
    };
  }, [url, online]);

  const loading = resultado.url !== url;

  return {
    data: loading ? null : resultado.data,
    loading,
    error: !loading && resultado.error,
  };
}

export default useFetch;
