import { createClient } from '@supabase/supabase-js';


// Replace these two links with your own links
// This for the Project URL
const supabaseUrl = "https://defansizbfkuttbpebjz.supabase.co";

// This for the API Key
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZmFuc2l6YmZrdXR0YnBlYmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNDc4NzcsImV4cCI6MjA1OTgyMzg3N30.caLdYY7esqgp5pXjJGlVthItVqQxQSgTAONID_XYs0A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);