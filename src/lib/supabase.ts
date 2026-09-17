import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://kgpxwgijzduofjljmvlc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncHh3Z2lqemR1b2ZqbGptdmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MjYwOTUsImV4cCI6MjA2MTEwMjA5NX0.H3kdu259elIBkkfPc7xdrUUlDIWjUJdPekEWelKSTo4',
  {
    auth: {
      persistSession: false
    }
  }
);