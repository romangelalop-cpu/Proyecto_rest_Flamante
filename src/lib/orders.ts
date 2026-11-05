import { supabase } from '@/lib/supabase';

const ORDER_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export interface OrderInput {
  customerName: string;
  phone: string;
  address: string;
  mainDish: string;
  extras: string[];
  totalMxn: number;
}

export interface PlacedOrder {
  orderNumber: string;
  status: string;
}

export type OrderConfirmation = PlacedOrder & OrderInput;

export const ORDER_STATUS_STEPS = [
  'Recibido en Cocina',
  'En preparación',
  'En camino',
  'Entregado',
] as const;

function generateOrderNumber(): string {
  const bytes = new Uint32Array(4);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (value) => ORDER_CODE_ALPHABET[value % ORDER_CODE_ALPHABET.length]).join('');
  return `FLA-${code}`;
}

export async function placeOrder(input: OrderInput): Promise<PlacedOrder> {
  const orderNumber = generateOrderNumber();
  const status = ORDER_STATUS_STEPS[0];

  const { error } = await supabase.from('orders').insert({
    order_number: orderNumber,
    customer_name: input.customerName,
    phone: input.phone,
    address: input.address,
    main_dish: input.mainDish,
    extras: input.extras,
    total_mxn: input.totalMxn,
    status,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { orderNumber, status };
}
