import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://igdpnivsnufiezwwdcwf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHBuaXZzbnVmaWV6d3dkY3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjQ2OTEsImV4cCI6MjA3ODQwMDY5MX0.DYXLJISQtrJZ6LHDptyINayVOCoC-VDU7sqOvdx0Prw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
