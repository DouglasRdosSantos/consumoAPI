import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

// Avisos de "app nativo": conexão, cache offline pronto e botão de instalar
function PwaStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [installEvent, setInstallEvent] = useState(null);

  // Registra o service worker. Com registerType 'autoUpdate', versões novas
  // são aplicadas sozinhas; aqui só avisamos quando o app já funciona offline.
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW();

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    // O navegador avisa quando o app pode ser instalado. Guardamos o evento
    // para abrir a janela de instalação pelo nosso botão.
    const onBeforeInstall = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };
    const onInstalled = () => setInstallEvent(null);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Esconde o aviso de "pronto para offline" depois de alguns segundos
  useEffect(() => {
    if (!offlineReady) return;
    const timer = setTimeout(() => setOfflineReady(false), 5000);
    return () => clearTimeout(timer);
  }, [offlineReady, setOfflineReady]);

  async function instalar() {
    installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  }

  return (
    <>
      {!online && (
        <div className="pwa-offline" role="status">
          Você está offline. Mostrando os dados salvos.
        </div>
      )}

      <div className="pwa-toasts" aria-live="polite">
        {offlineReady && (
          <div className="pwa-toast">App pronto para uso offline.</div>
        )}

        {installEvent && (
          <div className="pwa-toast">
            <span>Instale o app no seu dispositivo</span>
            <button type="button" className="pwa-install" onClick={instalar}>
              Instalar
            </button>
            <button
              type="button"
              className="pwa-close"
              onClick={() => setInstallEvent(null)}
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PwaStatus;
