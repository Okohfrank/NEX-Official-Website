import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mvaxypgfxwtphgldgdtt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YXh5cGdmeHd0cGhnbGRnZHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTI5MDgsImV4cCI6MjEwMDQ4ODkwOH0.ys3OIZavLpkWUDwGyVEBP8PSEqHtZI6ZWQU2toRJdCc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
