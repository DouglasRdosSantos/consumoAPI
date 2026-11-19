import { useSyncExternalStore } from "react";

// Avisa o React sempre que o navegador perde ou recupera a internet
function inscrever(avisar) {
  window.addEventListener("online", avisar);
  window.addEventListener("offline", avisar);
  return () => {
    window.removeEventListener("online", avisar);
    window.removeEventListener("offline", avisar);
  };
}

// true com internet, false sem. O componente renderiza de novo quando muda.
function useOnline() {
  return useSyncExternalStore(inscrever, () => navigator.onLine);
}

export default useOnline;
