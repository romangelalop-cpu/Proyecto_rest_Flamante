/*
# Create orders and reviews tables for Flamante restaurant

1. New Tables
- `orders`: food orders placed through the "Ordenar" form.
  - `id` (uuid, primary key)
  - `order_number` (text, unique, e.g. FLA-1234)
  - `customer_name` (text)
  - `phone` (text)
  - `address` (text)
  - `main_dish` (text)
  - `extras` (text array of selected add-ons)
  - `status` (text, default 'Recibido en Cocina')
  - `created_at` (timestamptz)
- `reviews`: customer testimonials with star ratings.
  - `id` (uuid, primary key)
  - `name` (text)
  - `rating` (smallint, 1 to 5)
  - `comment` (text)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on both tables.
- `orders`: anonymous visitors may only INSERT orders. Nobody can read the order list publicly, which protects customer phone numbers and addresses.
- `reviews`: anonymous visitors may read and insert reviews. Updates and deletes are not allowed.
- Grants are limited to the verbs the site uses.

3. Notes
- The site has no sign-in, so policies target the `anon` and `authenticated` roles.
- Check constraints keep ratings in range and text fields non-empty and bounded in length.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  customer_name text NOT NULL CHECK (char_length(customer_name) BETWEEN 2 AND 120),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  address text NOT NULL CHECK (char_length(address) BETWEEN 5 AND 300),
  main_dish text NOT NULL CHECK (char_length(main_dish) BETWEEN 2 AND 120),
  extras text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'Recibido en Cocina',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON orders TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 80),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL CHECK (char_length(comment) BETWEEN 10 AND 600),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON reviews TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews (created_at DESC);
