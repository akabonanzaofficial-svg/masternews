import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image_url: string | null;
  category: string;
  author: string;
  published_at: string;
  featured: boolean;
  views: number;
  created_at: string;
}
