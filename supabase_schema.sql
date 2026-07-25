-- ============================================================
-- NETWORK OF ENGINEERING XCELLENCE (NEX) - SUPABASE DB SCHEMA
-- Copy & Run this SQL script in the Supabase SQL Editor
-- ============================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  matric_number TEXT,
  faculty_dept TEXT,
  level TEXT,
  role TEXT DEFAULT 'unplaced_member',
  avatar_url TEXT,
  knowledge_area TEXT,
  skills TEXT[],
  focus_areas TEXT[],
  points INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. GROUPS TABLE
CREATE TABLE IF NOT EXISTS public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  focus_area TEXT NOT NULL,
  leader_id UUID REFERENCES public.profiles(id),
  mentor_name TEXT,
  status TEXT DEFAULT 'Research Phase',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. PROPOSALS TABLE
CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name TEXT NOT NULL,
  title TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  proposed_solution TEXT NOT NULL,
  budget_estimate NUMERIC,
  status TEXT DEFAULT 'Under Review',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. BOUNTIES TABLE
CREATE TABLE IF NOT EXISTS public.bounties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  submitted_by TEXT NOT NULL,
  description TEXT NOT NULL,
  votes INTEGER DEFAULT 1,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_time TEXT NOT NULL,
  location TEXT NOT NULL,
  speaker TEXT,
  category TEXT DEFAULT 'Workshop',
  rsvps INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient TEXT NOT NULL,
  title TEXT NOT NULL,
  cert_type TEXT NOT NULL,
  cert_code TEXT UNIQUE NOT NULL,
  issued_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) with open read access
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Access" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Public Read Access" ON public.bounties FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.proposals FOR SELECT USING (true);
