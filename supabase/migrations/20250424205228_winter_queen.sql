/*
  # Fix newsletter RLS policies

  1. Changes
    - Update RLS policies for lisas_natural_path_email_list table
    - Allow anonymous users to insert new email subscriptions
    - Maintain existing table structure

  2. Security
    - Enable RLS on table (already enabled)
    - Add policy for anonymous users to insert new subscriptions
    - No read/update/delete policies needed as this is insert-only
*/

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Allow anonymous email subscription" ON lisas_natural_path_email_list;

-- Create a new policy that properly allows anonymous insertions
CREATE POLICY "Allow anonymous email subscription"
ON lisas_natural_path_email_list
FOR INSERT
TO anon
WITH CHECK (true);