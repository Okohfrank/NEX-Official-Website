import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mvaxypgfxwtphgldgdtt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YXh5cGdmeHd0cGhnbGRnZHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTI5MDgsImV4cCI6MjEwMDQ4ODkwOH0.ys3OIZavLpkWUDwGyVEBP8PSEqHtZI6ZWQU2toRJdCc';

let supabaseClient = null;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  });
} catch (error) {
  console.warn('Supabase initialization warning:', error);
}

export const supabase = supabaseClient;

/**
 * Test Supabase Database Connection
 */
export const testSupabaseConnection = async () => {
  if (!supabase) return { connected: false, error: 'Client not initialized' };
  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    if (error) return { connected: false, error: error.message };
    return { connected: true, data };
  } catch (err) {
    return { connected: false, error: err.message };
  }
};

/**
 * Safe fetch wrapper that degrades gracefully to defaultData on network or API failure
 */
export const fetchSupabaseData = async (tableName, defaultData = []) => {
  if (!supabase) return defaultData;
  try {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error || !data || data.length === 0) return defaultData;
    return data;
  } catch (err) {
    console.warn(`Supabase fetch warning for table "${tableName}":`, err.message);
    return defaultData;
  }
};

/**
 * Safe insert wrapper
 */
export const insertSupabaseRecord = async (tableName, recordData) => {
  if (!supabase) return { success: false, error: 'Client offline' };
  try {
    const { data, error } = await supabase.from(tableName).insert([recordData]);
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
