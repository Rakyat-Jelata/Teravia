// 1. IMPORT SUPABASE JS CLIENT VIA CDN MODERN (ES MODULES)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// 2. KREDENSIAL API SUPABASE
// Ganti teks di dalam tanda kutip dengan data yang Anda salin dari Tahap 2 tadi!
const SUPABASE_URL = "https://oigzazqytftjlfhdvlug.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pZ3phenF5dGZ0amxmaGR2bHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NzUyMjksImV4cCI6MjA5OTI1MTIyOX0.eyF-RksDlwMX1iboC03Z50m1qq6aR40npCNLg7k4FjA"

// 3. INISIALISASI CLIENT
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log("🚀 Teravia Backend: Supabase Client berhasil terinisialisASI!");

