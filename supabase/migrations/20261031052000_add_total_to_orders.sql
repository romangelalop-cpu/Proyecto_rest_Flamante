/*
# Add order total to orders

1. Modified Tables
- `orders`: new column `total_mxn` (integer, whole pesos, default 0, never negative). It stores the estimated total the customer saw when placing the order.

2. Security
- No policy or grant changes. The existing anonymous INSERT policy on `orders` already covers the new column.

3. Notes
- Existing rows (if any) receive a total of 0 through the default.
*/

ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_mxn integer NOT NULL DEFAULT 0 CHECK (total_mxn >= 0);
