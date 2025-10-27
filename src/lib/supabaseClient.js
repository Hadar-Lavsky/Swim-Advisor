// src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Environment validation
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.\n' +
    'Required: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY'
  );
}

// Optimized Supabase client configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'swim-advisor-auth',
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'swim-advisor',
    },
  },
  // Realtime is disabled by default for better performance
  // Enable only when needed for specific features
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
});
