/*
  # Create customer questions table

  1. New Tables
    - `customer_questions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `message` (text, required)
      - `created_at` (timestamp)
      - `status` (text) - for tracking question status (new, replied, etc.)

  2. Security
    - Enable RLS on `customer_questions` table
    - Add policy for anonymous users to insert new questions
*/

CREATE TABLE IF NOT EXISTS customer_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

ALTER TABLE customer_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous question submission"
  ON customer_questions
  FOR INSERT
  TO anon
  WITH CHECK (true);