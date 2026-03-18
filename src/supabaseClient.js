import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://frcnfuloaxduznqpkjtt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyY25mdWxvYXhkdXpucXBranR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTIxMDIsImV4cCI6MjA4OTM4ODEwMn0.k3fZA02yNzbZtka8q1ZYKo9Wze-l4dvrKsaKcLlnXdg'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
