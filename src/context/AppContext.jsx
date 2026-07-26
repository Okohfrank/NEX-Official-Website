import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_USER_PROFILES,
  CURRENT_CYCLE
} from '../data/mockData';
import {
  fetchSupabaseBounties,
  insertBountyToSupabase,
  fetchSupabaseEvents,
  insertEventToSupabase,
  fetchSupabaseCertificates,
  insertCertificateToSupabase
} from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // -------------------------------------------------------------
  // Persistent State Initializers (Preserves exact page on reload)
  // -------------------------------------------------------------
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('nex_userRole') || 'public';
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('nex_activeTab') || 'home';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nex_currentUser');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_USER_PROFILES.publicGuest;
  });

  const [userUpvotedBounties, setUserUpvotedBounties] = useState(() => {
    const saved = localStorage.getItem('nex_userUpvotedBounties');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Global state collections
  const [cycle, setCycle] = useState(CURRENT_CYCLE);
  const [researchWorkspace, setResearchWorkspace] = useState({
    groupId: "grp-alpha", groupName: "Group Alpha - Clean Hydro Systems",
    problemStatement: "", literatureReview: "", findingsSummary: "", constraints: "", researchLogs: []
  });
  const [buildWorkspace, setBuildWorkspace] = useState({
    groupId: "grp-solar", groupName: "High-Efficiency Biogas Digester Kiosk",
    devPrep: { litReview: "", costAnalysis: [], safetyRisk: [] }, buildLogs: []
  });
  const [leaderboard, setLeaderboard] = useState([]);
  
  const [bounties, setBounties] = useState(() => {
    const saved = localStorage.getItem('nex_bounties');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('nex_events');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [executives, setExecutives] = useState(() => {
    const saved = localStorage.getItem('nex_executives');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('nex_certificates');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [topicChangeRequests, setTopicChangeRequests] = useState([]);

  const [notifications, setNotifications] = useState([]);

  // Supabase Hydration Effect
  useEffect(() => {
    const hydrateData = async () => {
      try {
        const { data: bData } = await supabase.from('bounties').select('*').order('created_at', { ascending: false });
        if (bData) setBounties(bData);

        const { data: eData } = await supabase.from('events').select('*').order('created_at', { ascending: false });
        if (eData) setEvents(eData);

        const { data: execData } = await supabase.from('executives').select('*').order('exec_order', { ascending: true });
        if (execData) setExecutives(execData);

        const { data: certData } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
        if (certData) setCertificates(certData);

        const { data: lData } = await supabase.from('profiles').select('*').order('points', { ascending: false });
        if (lData) {
          const rankedLeaderboard = lData.map((item, index) => ({ ...item, rank: index + 1 }));
          setLeaderboard(rankedLeaderboard);
        }

        // Hydrate Workspaces
        const { data: wData } = await supabase.from('workspaces').select('*').limit(2);
        if (wData && wData.length > 0) {
           const rw = wData.find(w => w.group_id === 'grp-alpha') || wData[0];
           const bw = wData.find(w => w.group_id === 'grp-solar') || wData[1] || wData[0];
           
           const { data: rLogs } = await supabase.from('workspace_logs').select('*').eq('group_id', rw.group_id).order('created_at', { ascending: false });
           const { data: bLogs } = await supabase.from('workspace_logs').select('*').eq('group_id', bw.group_id).order('created_at', { ascending: false });
           const { data: bCosts } = await supabase.from('build_costs').select('*').eq('group_id', bw.group_id);
           const { data: bRisks } = await supabase.from('build_risks').select('*').eq('group_id', bw.group_id);

           setResearchWorkspace({
             groupId: rw.group_id,
             groupName: rw.group_name || 'Group Alpha',
             problemStatement: rw.problem_statement || '',
             literatureReview: rw.literature_review || '',
             findingsSummary: rw.findings_summary || '',
             constraints: rw.constraints || '',
             researchLogs: (rLogs || []).map(l => ({ id: l.id, author: l.author, text: l.text, tag: l.tag, time: "Recently" }))
           });

           setBuildWorkspace({
             groupId: bw.group_id,
             groupName: bw.group_name || 'Selected Project',
             devPrep: {
               litReview: bw.build_lit_review || '',
               costAnalysis: bCosts || [],
               safetyRisk: bRisks || []
             },
             buildLogs: (bLogs || []).map(l => ({ id: l.id, author: l.author, text: l.text, skill: l.tag, time: "Recently" }))
           });
        }
      } catch (err) {
        console.error('Data hydration error', err);
      }
    };
    hydrateData();
  }, []);

  const [toasts, setToasts] = useState([]);

  // -------------------------------------------------------------
  // Synchronization Effects for LocalStorage Persistence
  // -------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem('nex_userRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('nex_activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('nex_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nex_userUpvotedBounties', JSON.stringify(userUpvotedBounties));
  }, [userUpvotedBounties]);

  useEffect(() => {
    localStorage.setItem('nex_bounties', JSON.stringify(bounties));
  }, [bounties]);

  useEffect(() => {
    localStorage.setItem('nex_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('nex_executives', JSON.stringify(executives));
  }, [executives]);

  useEffect(() => {
    localStorage.setItem('nex_certificates', JSON.stringify(certificates));
  }, [certificates]);

  // Ensure clean white & brand theme on <html> element
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Toast Action Helper
  const showToast = ({ title, message, type = 'success', duration = 4000 }) => {
    const id = Date.now();
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Account-based persistent profiles store (Preserves photos across logouts and ready for backend sync)
  const [userProfilesStore, setUserProfilesStore] = useState(() => {
    const saved = localStorage.getItem('nex_userProfilesStore');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('nex_userProfilesStore', JSON.stringify(userProfilesStore));
  }, [userProfilesStore]);

  // Update User Profile Action
  const updateUserProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const emailKey = (prev.email || 'default_user').toLowerCase();
      const newProfile = { ...prev, ...updatedFields };

      setUserProfilesStore(store => {
        const updatedStore = { ...store, [emailKey]: newProfile };
        localStorage.setItem('nex_userProfilesStore', JSON.stringify(updatedStore));
        return updatedStore;
      });

      localStorage.setItem('nex_currentUser', JSON.stringify(newProfile));
      return newProfile;
    });

    showToast({
      title: 'Profile Saved Permanently!',
      message: 'Your profile details and gallery photo are saved to your account and will persist across logouts.',
      type: 'success'
    });
  };

  // Helper logout action with Supabase Auth signOut
  const logout = async () => {
    try {
      if (supabase) await supabase.auth.signOut();
    } catch (e) {}
    setUserRole('public');
    setCurrentUser(MOCK_USER_PROFILES.publicGuest);
    setActiveTab('home');
    localStorage.removeItem('nex_userRole');
    localStorage.removeItem('nex_activeTab');
    localStorage.removeItem('nex_currentUser');
  };

  // Reset all local session data
  const resetAllData = () => {
    localStorage.clear();
    setUserRole('public');
    setCurrentUser(MOCK_USER_PROFILES.publicGuest);
    setActiveTab('home');
    setBounties([]);
    setEvents([]);
    setExecutives([]);
    setUserUpvotedBounties([]);
    showToast({
      title: 'Session Storage Reset',
      message: 'All local session state has been reset to defaults.',
      type: 'info'
    });
  };

  // Update current user profile when role changes
  const changeRole = (newRole, explicitProfile = null) => {
    setUserRole(newRole);

    if (explicitProfile) {
      setCurrentUser(explicitProfile);
      localStorage.setItem('nex_currentUser', JSON.stringify(explicitProfile));
      return;
    }

    // Preserve active signed-up/logged-in user profile
    if (currentUser && currentUser.email && currentUser.email !== 'guest@nex.edu.ng') {
      const updatedProfile = { ...currentUser, role: newRole };
      setCurrentUser(updatedProfile);
      localStorage.setItem('nex_currentUser', JSON.stringify(updatedProfile));
      return;
    }

    let targetProfile = MOCK_USER_PROFILES.publicGuest;
    switch (newRole) {
      case 'public':
        targetProfile = MOCK_USER_PROFILES.publicGuest;
        setActiveTab('home');
        break;
      case 'unplaced_member':
        targetProfile = MOCK_USER_PROFILES.unplacedStudent;
        setActiveTab('dashboard');
        break;
      case 'group_member_research':
        targetProfile = MOCK_USER_PROFILES.researchMember;
        setActiveTab('research');
        break;
      case 'group_member_selected':
        targetProfile = MOCK_USER_PROFILES.selectedMember;
        setActiveTab('build');
        break;
      case 'exec_admin':
        targetProfile = MOCK_USER_PROFILES.execAdmin;
        setActiveTab('admin_overview');
        break;
      default:
        break;
    }

    setCurrentUser(targetProfile);
    localStorage.setItem('nex_currentUser', JSON.stringify(targetProfile));
  };

  // User Actions
  const addResearchLog = async (text, tag) => {
    const newLog = {
      author: currentUser.name,
      text,
      tag: tag || "Update",
      group_id: researchWorkspace.groupId,
      type: 'research'
    };
    try {
      const { data } = await supabase.from('workspace_logs').insert([newLog]).select();
      if (data && data[0]) {
        setResearchWorkspace(prev => ({
          ...prev,
          researchLogs: [{ id: data[0].id, author: data[0].author, text: data[0].text, tag: data[0].tag, time: "Just now" }, ...prev.researchLogs]
        }));
      }
    } catch (e) {}
  };

  const addBuildLog = async (text, skill) => {
    const newLog = {
      author: currentUser.name,
      text,
      tag: skill || "Prototyping",
      group_id: buildWorkspace.groupId,
      type: 'build'
    };
    try {
      const { data } = await supabase.from('workspace_logs').insert([newLog]).select();
      if (data && data[0]) {
        setBuildWorkspace(prev => ({
          ...prev,
          buildLogs: [{ id: data[0].id, author: data[0].author, text: data[0].text, skill: data[0].tag, time: "Just now" }, ...prev.buildLogs]
        }));
      }
    } catch (e) {}
  };

  const upvoteBounty = (id) => {
    if (userUpvotedBounties.includes(id)) {
      showToast({
        title: 'Already Upvoted',
        message: 'You have already cast your single vote for this problem bounty.',
        type: 'warning'
      });
      return false;
    }

    setUserUpvotedBounties(prev => [...prev, id]);
    setBounties(prev => prev.map(b => b.id === id ? { ...b, votes: b.votes + 1 } : b));
    showToast({
      title: 'Upvote Recorded!',
      message: 'Your vote has been added to this problem challenge.',
      type: 'success'
    });
    return true;
  };

  const rsvpEvent = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, rsvps: e.rsvps + 1, userRsvped: true } : e));
    showToast({
      title: 'RSVP Confirmed!',
      message: 'Your attendance reservation has been recorded for this workshop.',
      type: 'success'
    });
  };

  // Admin Controls with Supabase DB Sync
  const addEvent = (eventData) => {
    const newEvt = {
      id: Date.now(),
      title: eventData.title,
      date: eventData.date || 'Upcoming 2026',
      time: eventData.time || '10:00 AM',
      location: eventData.location || 'Faculty Auditorium / Virtual',
      speaker: eventData.speaker || 'NEX Exec Council',
      category: eventData.category || 'Workshop',
      rsvps: 0,
      userRsvped: false
    };
    setEvents(prev => [newEvt, ...prev]);
    insertEventToSupabase(newEvt);

    setNotifications(prev => [
      { id: Date.now(), text: `New Workshop Added: ${eventData.title}`, time: "Just now", read: false },
      ...prev
    ]);
  };

  const addBounty = (bountyData) => {
    const newBounty = {
      id: Date.now(),
      title: bountyData.title,
      domain: bountyData.domain || 'Engineering',
      submittedBy: bountyData.submittedBy || 'Industry Partner / Admin',
      description: bountyData.description,
      votes: 1,
      status: bountyData.status || 'Active Mission Candidate'
    };
    setBounties(prev => [newBounty, ...prev]);
    insertBountyToSupabase(newBounty);
  };

  const addExecutive = (execData) => {
    const newExec = {
      name: execData.name,
      role: execData.role,
      dept: execData.dept,
      exec_order: parseInt(execData.order) || executives.length + 1,
      bio: execData.bio,
      quote: execData.quote || '',
      photo: execData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      instagram: execData.instagram || '',
      linkedin: execData.linkedin || ''
    };
    
    const insertToDb = async () => {
      try {
        const { data, error } = await supabase.from('executives').insert([newExec]).select();
        if (data && data[0]) {
          const insertedExec = { ...data[0], order: data[0].exec_order };
          setExecutives(prev => [...prev, insertedExec].sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        console.error('Exec insert error:', err);
      }
    };
    insertToDb();
  };

  const awardMemberPoints = (studentName, pointsToAdd, newBadge) => {
    if (!studentName) return;

    const syncToDb = async () => {
      try {
        const { data: profiles } = await supabase.from('profiles').select('*');
        if (!profiles) return;
        
        const target = profiles.find(p => p.name?.toLowerCase() === studentName.toLowerCase() || p.id === studentName || p.full_name?.toLowerCase() === studentName.toLowerCase());
        
        if (target) {
          const currentPts = parseInt(target.points) || 0;
          const newPts = currentPts + parseInt(pointsToAdd);
          
          let updatedSkills = target.skills;
          if (newBadge) {
            let currentBadges = [];
            if (typeof target.skills === 'string') {
               try { currentBadges = JSON.parse(target.skills); } catch(e) { currentBadges = target.skills.split(','); }
            } else if (Array.isArray(target.skills)) {
               currentBadges = target.skills;
            }
            if (!currentBadges.includes(newBadge)) {
              currentBadges.push(newBadge);
              updatedSkills = JSON.stringify(currentBadges);
            }
          }
          
          await supabase.from('profiles').update({ points: newPts, skills: updatedSkills }).eq('id', target.id);
          
          if (currentUser && currentUser.email === target.email) {
            setCurrentUser(prev => ({ ...prev, points: newPts }));
          }
        }
      } catch (err) {
        console.error('Award error:', err);
      }
    };
    syncToDb();

    setLeaderboard(prev => {
      const updatedList = (prev || []).map(m => {
        const isMatch = m.name && (m.name.toLowerCase() === studentName.toLowerCase() || m.id === studentName);
        if (isMatch) {
          const currentPoints = parseInt(m.points) || 0;
          const pts = parseInt(pointsToAdd) || 0;
          const currentBadges = Array.isArray(m.skillBadges) ? m.skillBadges : (Array.isArray(m.badges) ? m.badges : []);
          const updatedBadges = newBadge && !currentBadges.includes(newBadge) ? [...currentBadges, newBadge] : currentBadges;
          return { 
            ...m, 
            points: currentPoints + pts, 
            badges: updatedBadges, 
            skillBadges: updatedBadges 
          };
        }
        return m;
      });

      return updatedList
        .sort((a, b) => (parseInt(b.points) || 0) - (parseInt(a.points) || 0))
        .map((item, index) => ({ ...item, rank: index + 1 }));
    });

    setNotifications(prev => [
      { id: Date.now(), text: `Recognized Student ${studentName} with +${pointsToAdd} Points${newBadge ? ` & '${newBadge}' Badge` : ''}!`, time: "Just now", read: false },
      ...(prev || [])
    ]);

    showToast({
      title: 'Points & Skill Badge Awarded!',
      message: `Successfully granted +${pointsToAdd} PTS and '${newBadge}' to ${studentName}.`,
      type: 'success'
    });
  };

  const issueCertificate = (recipient, certTitle, certType) => {
    const newCert = {
      id: `cert-${Date.now()}`,
      recipient,
      title: certTitle,
      type: certType || 'Project Certificate',
      date: 'Jul 2026',
      code: `NEX-CERT-2026-${Math.floor(100 + Math.random() * 900)}`
    };
    setCertificates(prev => [newCert, ...prev]);
    insertCertificateToSupabase(newCert);

    setNotifications(prev => [
      { id: Date.now(), text: `Issued CV Certificate to ${recipient}: ${certTitle}`, time: "Just now", read: false },
      ...prev
    ]);
  };

  const handleTopicChangeReview = async (id, approved, feedback) => {
    try {
      await supabase.from('topic_change_requests').update({ 
        status: approved ? 'Approved' : 'Rejected', 
        feedback 
      }).eq('id', id);
    } catch (err) {
      console.error('Topic update error:', err);
    }

    setTopicChangeRequests(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: approved ? 'Approved' : 'Rejected', feedback };
      }
      return t;
    }));

    if (approved) {
      const targetReq = topicChangeRequests.find(t => t.id === id);
      if (targetReq) {
        setResearchWorkspace(prev => ({
          ...prev,
          topic: targetReq.proposedTopic
        }));
      }
    }
  };

  const value = {
    userRole,
    changeRole,
    logout,
    resetAllData,
    currentUser,
    updateUserProfile,
    activeTab,
    setActiveTab,
    cycle,
    researchWorkspace,
    setResearchWorkspace,
    buildWorkspace,
    setBuildWorkspace,
    leaderboard,
    bounties,
    userUpvotedBounties,
    events,
    executives,
    setExecutives,
    certificates,
    topicChangeRequests,
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    toasts,
    showToast,
    removeToast,
    addResearchLog,
    addBuildLog,
    upvoteBounty,
    rsvpEvent,

    // Admin Controls
    addEvent,
    addBounty,
    addExecutive,
    awardMemberPoints,
    issueCertificate,
    handleTopicChangeReview
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
