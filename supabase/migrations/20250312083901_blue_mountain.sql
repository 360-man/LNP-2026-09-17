/*
  # Create email list table

  1. New Tables
    - `lisas_natural_path_email_list`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `subscribed` (boolean)

  2. Security
    - Enable RLS on `lisas_natural_path_email_list` table
    - Add policy for inserting new emails
*/

CREATE TABLE IF NOT EXISTS lisas_natural_path_email_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  subscribed boolean DEFAULT true
);

ALTER TABLE lisas_natural_path_email_list ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous email subscription"
  ON lisas_natural_path_email_list
  FOR INSERT
  TO anon
  WITH CHECK (true);