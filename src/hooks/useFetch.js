import { useEffect, useState } from "react";
import axios from "axios";

// Hook reutilizável: busca os dados de uma URL e controla loading/erro.
// Guarda junto a URL de onde veio a resposta: se a URL mudar (ex.: trocar de
// página), "loading" volta a ser true até a resposta nova chegar.
function useFetch(url) {
  const [resultado, setResultado] = useState({ url: null, data: null, error: false });

  useEffect(() => {
    // Ignora a resposta antiga se a URL mudar antes de ela chegar
    let ativo = true;

    axios
      .get(url)
      .then((response) => {
        if (ativo) setResultado({ url, data: response.data, error: false });
      })
      .catch((error) => {
        if (!ativo) return;
        console.log("Error: ", error);
        setResultado({ url, data: null, error: true });
      });

    return () => {
      ativo = false;
    };
  }, [url]);

  const loading = resultado.url !== url;

  return {
    data: loading ? null : resultado.data,
    loading,
    error: !loading && resultado.error,
  };
}

export default useFetch;
