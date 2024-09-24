import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://lcpiyvmcrgapmbzoepkv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjcGl5dm1jcmdhcG1iem9lcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxNzAxMDksImV4cCI6MjA0Mjc0NjEwOX0.4cZ80xcWtUPES5jQLmN3xOP_KFzCDJZDpy2HoKNzFbk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
