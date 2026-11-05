import { Bike, CheckCircle2, ChefHat, Receipt, type LucideIcon } from 'lucide-react';
import { ORDER_STATUS_STEPS, type OrderConfirmation } from '@/lib/orders';
import { formatMxn } from '@/lib/format';

const STEP_ICONS: Record<(typeof ORDER_STATUS_STEPS)[number], LucideIcon> = {
  'Recibido en Cocina': Receipt,
  'En preparación': ChefHat,
  'En camino': Bike,
  Entregado: CheckCircle2,
};

interface OrderTrackerProps {
  confirmation: OrderConfirmation;
  onReset: () => void;
}

export default function OrderTracker({ confirmation, onReset }: OrderTrackerProps) {
  const currentIndex = Math.max(0, ORDER_STATUS_STEPS.indexOf(confirmation.status as (typeof ORDER_STATUS_STEPS)[number]));

  return (
    <div className="animate-fade-up space-y-8">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-verde-500 text-white">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-800 uppercase tracking-[0.15em] text-verde-700">Pedido confirmado</p>
          <p className="font-display text-4xl text-cacao-900">#{confirmation.orderNumber}</p>
          <p className="mt-2 text-sm text-cacao-500">Guarda este número para dar seguimiento a tu pedido.</p>
        </div>
      </div>

      <div className="rounded-2xl bg-cempasuchil-100 px-5 py-4">
        <p className="text-sm text-cacao-700">Estatus actual</p>
        <p className="font-display text-2xl text-cacao-900">{ORDER_STATUS_STEPS[currentIndex]}</p>
      </div>

      <ol className="space-y-5">
        {ORDER_STATUS_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[step];
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <li key={step} className="flex items-center gap-4">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center">
                {isCurrent && (
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cempasuchil-400" aria-hidden="true" />
                )}
                <span
                  className={`relative grid h-11 w-11 place-items-center rounded-full transition-colors duration-500 ${
                    isDone
                      ? 'bg-verde-500 text-white'
                      : isCurrent
                        ? 'bg-cempasuchil-400 text-cacao-900'
                        : 'bg-crema-200 text-cacao-500'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </span>
              <div>
                <p className={`font-600 ${isDone || isCurrent ? 'text-cacao-900' : 'text-cacao-500'}`}>{step}</p>
                {isCurrent && <p className="text-xs font-800 uppercase tracking-wider text-rosa-600">En este momento</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <dl className="divide-y divide-cacao-900/10 rounded-2xl border border-cacao-900/10 text-sm">
        <SummaryRow label="Cliente" value={confirmation.customerName} />
        <SummaryRow label="Platillo" value={confirmation.mainDish} />
        <SummaryRow
          label="Complementos"
          value={confirmation.extras.length > 0 ? confirmation.extras.join(', ') : 'Ninguno'}
        />
        <SummaryRow label="Dirección" value={confirmation.address} />
        <SummaryRow label="Total" value={formatMxn(confirmation.totalMxn)} emphasized />
      </dl>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-full border-2 border-rosa-500 px-6 py-3 text-base font-800 text-rosa-600 transition duration-300 hover:bg-rosa-500 hover:text-white"
      >
        Hacer otro pedido
      </button>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

function SummaryRow({ label, value, emphasized = false }: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3">
      <dt className="text-cacao-500">{label}</dt>
      <dd className={`text-right ${emphasized ? 'font-display text-xl text-rosa-600' : 'font-600 text-cacao-900'}`}>
        {value}
      </dd>
    </div>
  );
}
