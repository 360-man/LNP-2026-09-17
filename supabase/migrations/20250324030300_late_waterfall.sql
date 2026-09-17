/*
  # Add price column to service_bookings table

  1. Changes
    - Add `price` column to `service_bookings` table to store consultation/service prices
    - Make the column numeric to properly store currency values
    - Allow null values since some services might not have a price set

  2. Notes
    - Using numeric type for precise currency calculations
    - Adding column as nullable to maintain compatibility with existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_bookings' AND column_name = 'price'
  ) THEN
    ALTER TABLE service_bookings ADD COLUMN price numeric;
  END IF;
END $$;