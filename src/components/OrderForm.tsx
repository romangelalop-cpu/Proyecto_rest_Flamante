import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, ChevronDown, Loader2, Send } from 'lucide-react';
import { EXTRA_OPTIONS, MENU_ITEMS } from '@/data/site';
import { formatMxn } from '@/lib/format';
import { placeOrder, type OrderConfirmation } from '@/lib/orders';

interface OrderFormProps {
  preselectedDish: string | null;
  onPlaced: (confirmation: OrderConfirmation) => void;
}

interface FormValues {
  customerName: string;
  phone: string;
  address: string;
  mainDish: string;
  extras: string[];
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  customerName: '',
  phone: '',
  address: '',
  mainDish: '',
  extras: [],
};

const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const phone = values.phone.trim();
  const phoneDigits = phone.replace(/\D/g, '');

  if (values.customerName.trim().length < 2) {
    errors.customerName = 'Escribe tu nombre completo.';
  }
  if (!PHONE_PATTERN.test(phone) || phone.length > 20 || phoneDigits.length < 7) {
    errors.phone = 'Ingresa un teléfono válido, con al menos 7 dígitos.';
  }
  if (values.address.trim().length < 5) {
    errors.address = 'Indica una dirección de entrega completa.';
  }
  if (!values.mainDish) {
    errors.mainDish = 'Selecciona un platillo principal.';
  }
  return errors;
}

function calculateTotal(mainDish: string, extras: string[]): number {
  const dishPrice = MENU_ITEMS.find((item) => item.name === mainDish)?.price ?? 0;
  const extrasTotal = EXTRA_OPTIONS
    .filter((option) => extras.includes(option.name))
    .reduce((sum, option) => sum + option.price, 0);
  return dishPrice + extrasTotal;
}

const inputClass =
  'w-full rounded-xl border border-cacao-900/15 bg-white px-4 py-3 text-cacao-900 placeholder:text-cacao-500/60 transition duration-200 focus:border-rosa-500 focus:outline-none focus:ring-4 focus:ring-rosa-500/15';

export default function OrderForm({ preselectedDish, onPlaced }: OrderFormProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!preselectedDish) return;
    setValues((current) => ({ ...current, mainDish: preselectedDish }));
    setErrors((current) => ({ ...current, mainDish: undefined }));
  }, [preselectedDish]);

  const total = calculateTotal(values.mainDish, values.extras);

  const updateField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleExtra = (name: string) => {
    const next = values.extras.includes(name)
      ? values.extras.filter((extra) => extra !== name)
      : [...values.extras, name];
    updateField('extras', next);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setServerError(null);
    if (Object.keys(found).length > 0) return;

    const input = {
      customerName: values.customerName.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      mainDish: values.mainDish,
      extras: values.extras,
      totalMxn: total,
    };

    setSubmitting(true);
    try {
      const placed = await placeOrder(input);
      onPlaced({ ...input, ...placed });
    } catch {
      setServerError('No pudimos enviar tu pedido. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <h3 className="font-display text-2xl text-cacao-900">Datos de tu pedido</h3>
        <p className="mt-1 text-sm text-cacao-500">Completa el formulario y te confirmaremos al instante.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" htmlFor="customerName" error={errors.customerName} className="sm:col-span-2">
          <input
            id="customerName"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={values.customerName}
            onChange={(e) => updateField('customerName', e.target.value)}
            placeholder="Ej. Ana Pérez Gómez"
            aria-invalid={Boolean(errors.customerName)}
            className={inputClass}
          />
        </Field>

        <Field label="Teléfono" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            maxLength={20}
            value={values.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="55 1234 5678"
            aria-invalid={Boolean(errors.phone)}
            className={inputClass}
          />
        </Field>

        <Field label="Platillo principal" htmlFor="mainDish" error={errors.mainDish}>
          <div className="relative">
            <select
              id="mainDish"
              value={values.mainDish}
              onChange={(e) => updateField('mainDish', e.target.value)}
              aria-invalid={Boolean(errors.mainDish)}
              className={`${inputClass} appearance-none pr-11`}
            >
              <option value="">Elige un platillo</option>
              {MENU_ITEMS.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} · {formatMxn(item.price)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cacao-700" aria-hidden="true" />
          </div>
        </Field>

        <Field label="Dirección de entrega" htmlFor="address" error={errors.address} className="sm:col-span-2">
          <textarea
            id="address"
            rows={3}
            maxLength={300}
            autoComplete="street-address"
            value={values.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Calle, número, colonia y referencias"
            aria-invalid={Boolean(errors.address)}
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-800 text-cacao-800">Complementos extra</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {EXTRA_OPTIONS.map((option) => {
            const checked = values.extras.includes(option.name);
            return (
              <label
                key={option.name}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition duration-200 ${
                  checked
                    ? 'border-rosa-500 bg-rosa-50 text-rosa-700'
                    : 'border-cacao-900/15 bg-white text-cacao-800 hover:border-rosa-300'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleExtra(option.name)}
                    className="h-4 w-4 accent-rosa-500"
                  />
                  <span className="font-600">{option.name}</span>
                </span>
                <span className="font-800">+{formatMxn(option.price)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {serverError && (
        <div role="alert" className="flex items-start gap-3 rounded-xl bg-error-50 p-4 text-sm text-error-700 ring-1 ring-error-100 animate-fade-in">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-cacao-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-cacao-500">Total estimado</p>
          <p className="font-display text-4xl text-rosa-600">{formatMxn(total)}</p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-rosa-500 px-8 py-4 text-base font-800 text-white shadow-lg shadow-rosa-500/30 transition duration-300 hover:-translate-y-0.5 hover:bg-rosa-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Enviando pedido...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              Confirmar pedido
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Field({ label, htmlFor, error, className = '', children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-800 text-cacao-800">{label}</label>
      {children}
      {error && <p className="text-sm text-error-700">{error}</p>}
    </div>
  );
}
