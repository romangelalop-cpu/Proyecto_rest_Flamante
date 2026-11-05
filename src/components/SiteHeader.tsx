import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { NAV_ITEMS, type SectionId } from '@/data/site';

interface SiteHeaderProps {
  activeId: SectionId;
  onNavigate: (id: SectionId) => void;
}

export default function SiteHeader({ activeId, onNavigate }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault();
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-cempasuchil-400/30 bg-cacao-900/95 shadow-lg shadow-black/20 backdrop-blur-md'
          : 'border-transparent bg-cacao-900/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 sm:px-8">
        <a href="#inicio" onClick={(event) => handleNavigate(event, 'inicio')} aria-label="Ir al inicio">
          <BrandLogo />
        </a>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-white/10 p-1 ring-1 ring-white/15">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleNavigate(event, item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`block rounded-full px-4 py-2 text-sm font-600 transition-all duration-300 ${
                      isActive
                        ? 'bg-rosa-500 text-white shadow-md shadow-rosa-500/30'
                        : 'text-white/80 hover:bg-white/15 hover:text-cempasuchil-300'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-rosa-500 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navegación móvil"
        className={`overflow-hidden border-t border-white/10 bg-cacao-900 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => handleNavigate(event, item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block rounded-2xl px-4 py-3 text-base font-600 transition ${
                    isActive ? 'bg-rosa-500 text-white' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
