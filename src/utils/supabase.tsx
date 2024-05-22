import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_URL!;
const API = process.env.NEXT_PUBLIC_API!;

export const supabase = createClient(URL, API);
