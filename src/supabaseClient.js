// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// API Configuration
const supabase_url = "https://kdzamdxnnnzodftvjcrh.supabase.co";
const supabase_anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkemFtZHhubm56b2RmdHZqY3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzA5NzIsImV4cCI6MjA1MzI0Njk3Mn0.0Ml4p6x7VDY2m5_t2ISl0aEYpEum-vD8uFL1BYxBaes";

// Create a single instance of the Supabase client
const supabase = createClient(supabase_url, supabase_anon);

export default supabase;