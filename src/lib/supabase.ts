
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wpvnplugljwxrqibwvvc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm5wbHVnbGp3eHJxaWJ3dnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5ODg3MjAsImV4cCI6MjA1NTU2NDcyMH0.q29ynM6fccIwVas4gAFFGSkq0h1nfyfUVhuTdUlaVTI';

export const supabase = createClient(supabaseUrl, supabaseKey);
