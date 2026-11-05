import { useState } from 'react';
import { Bike, ChefHat, ShoppingBag } from 'lucide-react';
import OrderForm from '@/components/OrderForm';
import OrderTracker from '@/components/OrderTracker';
import SectionHeading from '@/components/SectionHeading';
import type { OrderConfirmation } from '@/lib/orders';

interface OrderSectionProps {
  preselectedDish: string | null;
}

const HOW_IT_WORKS = [
  { icon: ShoppingBag, title: 'Elige tu platillo', text: 'Selecciona tu favorito y agrega complementos.' },
  { icon: ChefHat, title: 'Lo preparamos', text: 'Nuestra cocina lo prepara al momento, con ingredientes frescos.' },
  { icon: Bike, title: 'Llega a tu puerta', text: 'Lo entregamos caliente en la dirección que nos indiques.' },
];

export default function OrderSection({ preselectedDish }: OrderSectionProps) {
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  return (
    <section id="ordenar" className="section-anchor bg-verde-800 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            align="left"
            eyebrow="Pedido en línea"
            title="Ordena desde tu lugar"
            description="Llena el formulario y recibe tu número de orden al instante para seguir cada etapa de tu pedido."
            tone="dark"
          />

          <ul className="mt-8 space-y-5">
            {HOW_IT_WORKS.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cempasuchil-400 text-cacao-900 shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-800 text-white">
                    <span className="mr-2 text-rosa-600">{index + 1}.</span>
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-[1.5] text-verde-100">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-cacao-900/5 ring-1 ring-cacao-900/5 sm:p-10">
          {confirmation ? (
            <OrderTracker confirmation={confirmation} onReset={() => setConfirmation(null)} />
          ) : (
            <OrderForm preselectedDish={preselectedDish} onPlaced={setConfirmation} />
          )}
        </div>
      </div>
    </section>
  );
}
