/*
  # Create service bookings table

  1. New Tables
    - `service_bookings`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `service_title` (text, required)
      - `service_type` (text)
      - `duration` (text)
      - `preferred_date` (date, required)
      - `preferred_time` (text, required)
      - `notes` (text)
      - `created_at` (timestamp)
      - `status` (text) - for tracking booking status (new, confirmed, etc.)

  2. Security
    - Enable RLS on `service_bookings` table
    - Add policy for anonymous users to insert new bookings
*/

CREATE TABLE IF NOT EXISTS service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_title text NOT NULL,
  service_type text,
  duration text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous booking submission"
  ON service_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);