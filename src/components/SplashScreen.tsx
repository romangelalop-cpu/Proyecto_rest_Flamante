import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

export default function SplashScreen({ onFinished }: SplashScreenProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setLeaving(true), 1350);
    const finishTimer = window.setTimeout(onFinished, 1900);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-rosa-900 transition-opacity duration-500 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-label="Cargando Flamante Restaurante"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,63,149,0.32),_transparent_58%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-cempasuchil-400 via-rosa-400 to-verde-500" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="animate-pop rounded-[2rem] bg-terracota-900/40 p-5 shadow-2xl shadow-black/30 ring-2 ring-cempasuchil-300/70 sm:p-7">
          <img
            src="/images/flamante.png"
            alt="Máscara mexicana de Flamante Restaurante"
            className="h-auto w-64 drop-shadow-[0_10px_14px_rgba(0,0,0,0.45)] sm:w-80"
          />
        </div>
        <p className="animate-fade-up mt-7 font-display text-4xl tracking-wide text-white [animation-delay:0.25s] sm:text-5xl">
          Flamante
        </p>
        <p className="animate-fade-up mt-2 text-sm font-800 uppercase tracking-[0.24em] text-cempasuchil-300 [animation-delay:0.35s] sm:text-base">
          Come como un Dios
        </p>
      </div>
    </div>
  );
}
