// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server Error" });
};



// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://yqobxssmlwsbqkldpkwb.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)