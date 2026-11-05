import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { MENU_CATEGORIES, type MenuItem } from '@/data/site';
import { formatMxn } from '@/lib/format';

interface MenuSectionProps {
  onOrderDish: (dishName: string) => void;
}

export default function MenuSection({ onOrderDish }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeItems = MENU_CATEGORIES.find((c) => c.id === activeCategory)?.items ?? [];

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-menu-card]');
    const distance = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <section id="menu" className="section-anchor bg-terracota-800 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Nuestro menú"
          title="Recorre nuestra carta"
          description="Desliza por las categorías y descubre desayunos, platillos mexicanos, tortas, bebidas y postres."
          tone="dark"
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {MENU_CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`rounded-full px-5 py-2.5 text-sm font-800 transition duration-300 ${
                  isActive
                    ? 'bg-rosa-500 text-white shadow-lg shadow-rosa-500/30'
                    : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 hover:text-cempasuchil-300'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {activeItems.map((item) => (
              <div key={item.name} data-menu-card className="w-72 shrink-0 snap-start sm:w-80">
                <MenuCard item={item} onOrder={() => onOrderDish(item.name)} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Ver platillos anteriores"
            className="absolute -left-3 top-1/2 hidden -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white text-cacao-900 shadow-lg ring-1 ring-cacao-900/10 transition hover:bg-rosa-50 hover:text-rosa-600 lg:grid"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Ver más platillos"
            className="absolute -right-3 top-1/2 hidden -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white text-cacao-900 shadow-lg ring-1 ring-cacao-900/10 transition hover:bg-rosa-50 hover:text-rosa-600 lg:grid"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2" aria-label="Categorías del menú">
          {MENU_CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={`${category.id}-dot`}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-label={`Ver categoría ${category.name}`}
                aria-current={isActive ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-8 bg-cempasuchil-400' : 'w-2.5 bg-white/30 hover:bg-rosa-300'
                }`}
              />
            );
          })}
        </div>
        <p className="mt-3 text-center text-sm text-crema-200">
          {MENU_CATEGORIES.find((category) => category.id === activeCategory)?.name} · Desliza para explorar
        </p>
      </div>
    </section>
  );
}

interface MenuCardProps {
  item: MenuItem;
  onOrder: () => void;
}

function MenuCard({ item, onOrder }: MenuCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-cacao-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rosa-900/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="absolute left-4 top-4 rounded-full bg-cempasuchil-300 px-3 py-1 text-xs font-800 text-cacao-900 shadow"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-cacao-900">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-[1.5] text-cacao-500">{item.description}</p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-display text-2xl text-rosa-600">{formatMxn(item.price)}</span>
          <button
            type="button"
            onClick={onOrder}
            className="inline-flex items-center gap-2 rounded-full bg-verde-600 px-4 py-2.5 text-sm font-800 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-verde-700 hover:shadow-lg active:translate-y-0"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Pedir
          </button>
        </div>
      </div>
    </article>
  );
}
