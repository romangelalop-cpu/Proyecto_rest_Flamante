import { ArrowRight, Sparkles } from 'lucide-react';
import { SLOGAN } from '@/data/site';

interface HeroSectionProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export default function HeroSection({ onOrderNow, onViewMenu }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="section-anchor relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <img
        src="https://images.pexels.com/photos/23947771/pexels-photo-23947771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        alt="Mesa mexicana colorida con platillos tradicionales"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-rosa-900/90 to-terracota-900/65 sm:bg-gradient-to-r sm:from-black/85 sm:via-rosa-900/85 sm:to-terracota-900/45" />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <div className="max-w-2xl">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-600 text-cempasuchil-200 ring-1 ring-white/25 backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Cocina mexicana auténtica
          </span>

          <h1 className="animate-fade-up mt-6 font-display text-5xl leading-[1.05] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] [animation-delay:0.1s] sm:text-7xl lg:text-8xl">
            Sabor que <span className="text-cempasuchil-300">enciende</span> tu mesa
          </h1>

          <p className="animate-fade-up mt-4 font-display text-2xl text-cempasuchil-300 [animation-delay:0.15s] sm:text-3xl">
            {SLOGAN}
          </p>

          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-[1.5] text-rosa-50 [animation-delay:0.2s] sm:text-xl">
            La sazón tradicional de México: chiles tostados a mano, masa recién hecha y hierbas frescas en cada platillo.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-4 [animation-delay:0.3s] sm:flex-row">
            <button
              type="button"
              onClick={onOrderNow}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cempasuchil-400 px-8 py-4 text-base font-800 text-cacao-900 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cempasuchil-300 hover:shadow-2xl active:translate-y-0"
            >
              ¡Pedir Ahora!
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onViewMenu}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-8 py-4 text-base font-600 text-white transition duration-300 hover:bg-white hover:text-rosa-700"
            >
              Ver menú
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-cempasuchil-400 via-rosa-500 to-verde-500" aria-hidden="true" />
    </section>
  );
}
