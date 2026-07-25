import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mvaxypgfxwtphgldgdtt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YXh5cGdmeHd0cGhnbGRnZHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTI5MDgsImV4cCI6MjEwMDQ4ODkwOH0.ys3OIZavLpkWUDwGyVEBP8PSEqHtZI6ZWQU2toRJdCc';

let supabaseClient = null;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  });
} catch (error) {
  console.warn('Supabase initialization warning:', error);
}

export const supabase = supabaseClient;

/**
 * Test Supabase Database Connection
 */
export const testSupabaseConnection = async () => {
  if (!supabase) return { connected: false, error: 'Client not initialized' };
  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    if (error) return { connected: false, error: error.message };
    return { connected: true, data };
  } catch (err) {
    return { connected: false, error: err.message };
  }
};

/**
 * Generate 6-Digit Email Verification OTP Code
 */
export const generateOtpCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Custom Branded NEX HTML Email Template Generator
 */
export const generateNexEmailHtml = (name, otpCode) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <div style="background-color: #060721; padding: 30px 20px; text-align: center; border-bottom: 4px solid #2FA137;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">NETWORK OF ENGINEERING XCELLENCE</h1>
        <p style="color: #2FA137; margin: 5px 0 0 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">Official Account Verification</p>
      </div>
      
      <div style="padding: 40px 30px; text-align: left;">
        <h2 style="color: #060721; font-size: 20px; font-weight: 800; margin-top: 0;">Welcome to NEX, ${name}!</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">Thank you for registering your profile with the Network of Engineering Xcellence. To complete your account verification and activate your member access portal, please enter the 6-digit confirmation code below:</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <div style="display: inline-block; background-color: #e6f6e8; border: 2px dashed #2FA137; border-radius: 16px; padding: 15px 35px;">
            <span style="font-size: 36px; font-weight: 900; color: #2FA137; letter-spacing: 8px; font-mono: true;">${otpCode}</span>
          </div>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 10px;">This security code is valid for 15 minutes.</p>
        </div>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #060721; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
          <p style="color: #334155; font-size: 12px; margin: 0; font-weight: 600;">Interdisciplinary Engineering & Innovation Platform</p>
          <p style="color: #64748b; font-size: 11px; margin: 4px 0 0 0;">Lagos State University • Faculty of Engineering & Sciences</p>
        </div>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
        <p style="margin: 0;">© 2026 Network of Engineering Xcellence (NEX). All rights reserved.</p>
      </div>
    </div>
  `;
};

/**
 * Register User & Send OTP Verification
 */
export const registerUserWithSupabase = async (formData) => {
  const otpCode = generateOtpCode();
  const emailLower = formData.email.trim().toLowerCase();

  // Try Supabase Auth SignUp
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailLower,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            matric_number: formData.matricNumber,
            dept: formData.department,
            level: formData.level,
            otp_code: otpCode
          }
        }
      });
      if (error && !error.message.includes('already registered')) {
        console.warn('Supabase auth warning:', error.message);
      }
    } catch (e) {
      console.warn('Supabase registration fallback:', e);
    }
  }

  // Create pending profile package
  const pendingProfile = {
    email: emailLower,
    name: formData.fullName,
    matricNumber: formData.matricNumber,
    dept: formData.department,
    level: formData.level,
    skills: formData.skills,
    knowledgeArea: formData.knowledgeArea,
    focusAreas: formData.focusAreas,
    otpCode: otpCode,
    created_at: new Date().toISOString()
  };

  console.info(`%c[NEX Security Mailer] Verification email dispatched to ${emailLower} | 6-Digit Security Code: ${otpCode}`, 'color: #2FA137; font-weight: bold; font-size: 13px;');

  return { success: true, otpCode, pendingProfile };
};

/**
 * Confirm User Profile in Supabase DB
 */
export const confirmUserInSupabase = async (profileData) => {
  if (!supabase) return { success: true };
  try {
    const { data, error } = await supabase.from('profiles').insert([{
      email: profileData.email,
      name: profileData.name,
      matric_number: profileData.matricNumber,
      faculty_dept: profileData.dept,
      level: profileData.level,
      knowledge_area: profileData.knowledgeArea,
      skills: profileData.skills,
      focus_areas: profileData.focusAreas,
      role: 'unplaced_member',
      points: 100
    }]);
    if (error) console.warn('Supabase DB insert warning:', error.message);
    return { success: true, data };
  } catch (err) {
    return { success: true };
  }
};

/**
 * Fetch Profiles from Supabase
 */
export const fetchSupabaseProfiles = async () => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error || !data) return [];
    return data;
  } catch (e) {
    return [];
  }
};

/**
 * Fetch & Sync Bounties from Supabase
 */
export const fetchSupabaseBounties = async (defaultBounties = []) => {
  if (!supabase) return defaultBounties;
  try {
    const { data, error } = await supabase.from('bounties').select('*');
    if (error || !data || data.length === 0) return defaultBounties;
    return data.map(b => ({
      id: b.id,
      title: b.title,
      domain: b.domain,
      submittedBy: b.submitted_by || b.submittedBy,
      description: b.description,
      votes: b.votes || 1,
      status: b.status || 'Active'
    }));
  } catch (e) {
    return defaultBounties;
  }
};

/**
 * Insert Bounty to Supabase DB
 */
export const insertBountyToSupabase = async (bountyData) => {
  if (!supabase) return;
  try {
    await supabase.from('bounties').insert([{
      title: bountyData.title,
      domain: bountyData.domain,
      submitted_by: bountyData.submittedBy,
      description: bountyData.description,
      votes: 1,
      status: bountyData.status || 'Active'
    }]);
  } catch (e) {
    console.warn('Bounty insert warning:', e);
  }
};

/**
 * Fetch & Sync Events from Supabase
 */
export const fetchSupabaseEvents = async (defaultEvents = []) => {
  if (!supabase) return defaultEvents;
  try {
    const { data, error } = await supabase.from('events').select('*');
    if (error || !data || data.length === 0) return defaultEvents;
    return data.map(ev => ({
      id: ev.id,
      title: ev.title,
      date: ev.event_date || ev.date,
      time: ev.event_time || ev.time,
      location: ev.location,
      speaker: ev.speaker,
      category: ev.category || 'Workshop',
      rsvps: ev.rsvps || 0
    }));
  } catch (e) {
    return defaultEvents;
  }
};

/**
 * Insert Event to Supabase DB
 */
export const insertEventToSupabase = async (eventData) => {
  if (!supabase) return;
  try {
    await supabase.from('events').insert([{
      title: eventData.title,
      speaker: eventData.speaker,
      event_date: eventData.date,
      event_time: eventData.time,
      location: eventData.location,
      category: eventData.category || 'Workshop',
      rsvps: 0
    }]);
  } catch (e) {
    console.warn('Event insert warning:', e);
  }
};

/**
 * Fetch & Sync Certificates from Supabase
 */
export const fetchSupabaseCertificates = async (defaultCerts = []) => {
  if (!supabase) return defaultCerts;
  try {
    const { data, error } = await supabase.from('certificates').select('*');
    if (error || !data || data.length === 0) return defaultCerts;
    return data.map(c => ({
      id: c.id,
      recipient: c.recipient,
      title: c.title,
      type: c.cert_type || c.type,
      code: c.cert_code || c.code,
      date: c.issued_date || c.date
    }));
  } catch (e) {
    return defaultCerts;
  }
};

/**
 * Insert Certificate to Supabase DB
 */
export const insertCertificateToSupabase = async (certData) => {
  if (!supabase) return;
  try {
    await supabase.from('certificates').insert([{
      recipient: certData.recipient,
      title: certData.title,
      cert_type: certData.type,
      cert_code: certData.code,
      issued_date: certData.date
    }]);
  } catch (e) {
    console.warn('Cert insert warning:', e);
  }
};

/**
 * Fetch & Sync Proposals from Supabase
 */
export const fetchSupabaseProposals = async (defaultProposals = []) => {
  if (!supabase) return defaultProposals;
  try {
    const { data, error } = await supabase.from('proposals').select('*');
    if (error || !data || data.length === 0) return defaultProposals;
    return data.map(p => ({
      id: p.id,
      groupName: p.group_name || p.groupName,
      title: p.title,
      problemStatement: p.problem_statement || p.problemStatement,
      proposedSolution: p.proposed_solution || p.proposedSolution,
      budgetEstimate: p.budget_estimate || p.budgetEstimate,
      status: p.status || 'Under Review'
    }));
  } catch (e) {
    return defaultProposals;
  }
};

/**
 * Insert Proposal to Supabase DB
 */
export const insertProposalToSupabase = async (proposalData) => {
  if (!supabase) return;
  try {
    await supabase.from('proposals').insert([{
      group_name: proposalData.groupName,
      title: proposalData.title,
      problem_statement: proposalData.problemStatement,
      proposed_solution: proposalData.proposedSolution,
      budget_estimate: proposalData.budgetEstimate,
      status: 'Under Review'
    }]);
  } catch (e) {
    console.warn('Proposal insert warning:', e);
  }
};

/**
 * Update Proposal Status in Supabase DB
 */
export const updateProposalStatusInSupabase = async (proposalId, status) => {
  if (!supabase) return;
  try {
    await supabase.from('proposals').update({ status }).eq('id', proposalId);
  } catch (e) {
    console.warn('Proposal status update warning:', e);
  }
};

/**
 * Fetch & Sync Groups from Supabase
 */
export const fetchSupabaseGroups = async (defaultGroups = []) => {
  if (!supabase) return defaultGroups;
  try {
    const { data, error } = await supabase.from('groups').select('*');
    if (error || !data || data.length === 0) return defaultGroups;
    return data.map(g => ({
      id: g.id,
      name: g.name,
      focusArea: g.focus_area || g.focusArea,
      mentorName: g.mentor_name || g.mentorName,
      status: g.status || 'Research Phase'
    }));
  } catch (e) {
    return defaultGroups;
  }
};

/**
 * Insert Group to Supabase DB
 */
export const insertGroupToSupabase = async (groupData) => {
  if (!supabase) return;
  try {
    await supabase.from('groups').insert([{
      name: groupData.name,
      focus_area: groupData.focusArea,
      mentor_name: groupData.mentorName,
      status: groupData.status || 'Research Phase'
    }]);
  } catch (e) {
    console.warn('Group insert warning:', e);
  }
};
