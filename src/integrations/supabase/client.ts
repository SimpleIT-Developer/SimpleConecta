// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://soeklqmudiiwecnuzfjf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZWtscW11ZGlpd2VjbnV6ZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NDQ5MzEsImV4cCI6MjA2NjAyMDkzMX0.ky9UoEAkj-6b5ZTFP3v2EAQKMcsVCKNdZ7j77rXVPPM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);