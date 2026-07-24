import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_USER_PROFILES,
  CURRENT_CYCLE,
  MOCK_RESEARCH_WORKSPACE,
  MOCK_BUILD_WORKSPACE,
  MOCK_LEADERBOARD,
  MOCK_BOUNTIES,
  MOCK_EVENTS,
  EXECUTIVES_DATA
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Role simulation: 'public' | 'unplaced_member' | 'group_member_research' | 'group_member_selected' | 'exec_admin'
  const [userRole, setUserRole] = useState('public');
  const [currentUser, setCurrentUser] = useState(MOCK_USER_PROFILES.publicGuest);
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  // Global state collections
  const [cycle, setCycle] = useState(CURRENT_CYCLE);
  const [researchWorkspace, setResearchWorkspace] = useState(MOCK_RESEARCH_WORKSPACE);
  const [buildWorkspace, setBuildWorkspace] = useState(MOCK_BUILD_WORKSPACE);
  const [leaderboard, setLeaderboard] = useState(MOCK_LEADERBOARD);
  const [bounties, setBounties] = useState(MOCK_BOUNTIES);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [executives, setExecutives] = useState(EXECUTIVES_DATA);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Group placement completed for 2026 First Cycle", time: "10m ago", read: false },
    { id: 2, text: "New Research Log entry by Nkechi Eze", time: "2h ago", read: false },
    { id: 3, text: "Proposal Review Gate is now OPEN", time: "1d ago", read: true }
  ]);

  // Ensure clean white & brand theme on <html> element
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Helper logout action
  const logout = () => {
    setUserRole('public');
    setCurrentUser(MOCK_USER_PROFILES.publicGuest);
    setActiveTab('home');
  };

  // Update current user profile when role changes
  const changeRole = (newRole) => {
    setUserRole(newRole);
    switch (newRole) {
      case 'public':
        setCurrentUser(MOCK_USER_PROFILES.publicGuest);
        setActiveTab('home');
        break;
      case 'unplaced_member':
        setCurrentUser(MOCK_USER_PROFILES.unplacedStudent);
        setActiveTab('dashboard');
        break;
      case 'group_member_research':
        setCurrentUser(MOCK_USER_PROFILES.researchMember);
        setActiveTab('research');
        break;
      case 'group_member_selected':
        setCurrentUser(MOCK_USER_PROFILES.selectedMember);
        setActiveTab('build');
        break;
      case 'exec_admin':
        setCurrentUser(MOCK_USER_PROFILES.execAdmin);
        setActiveTab('admin_overview');
        break;
      default:
        break;
    }
  };

  // Helper actions
  const addResearchLog = (text, tag) => {
    const newLog = {
      id: Date.now(),
      author: currentUser.name,
      time: "Just now",
      text,
      tag: tag || "Update"
    };
    setResearchWorkspace(prev => ({
      ...prev,
      researchLogs: [newLog, ...prev.researchLogs]
    }));
  };

  const addBuildLog = (text, skill) => {
    const newLog = {
      id: Date.now(),
      author: currentUser.name,
      time: "Just now",
      text,
      skill: skill || "Prototyping"
    };
    setBuildWorkspace(prev => ({
      ...prev,
      buildLogs: [newLog, ...prev.buildLogs]
    }));
  };

  const upvoteBounty = (id) => {
    setBounties(prev => prev.map(b => b.id === id ? { ...b, votes: b.votes + 1 } : b));
  };

  const rsvpEvent = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, rsvps: e.rsvps + 1, userRsvped: true } : e));
  };

  const value = {
    userRole,
    changeRole,
    logout,
    currentUser,
    activeTab,
    setActiveTab,
    darkMode,
    setDarkMode,
    cycle,
    researchWorkspace,
    setResearchWorkspace,
    buildWorkspace,
    setBuildWorkspace,
    leaderboard,
    bounties,
    events,
    executives,
    setExecutives,
    notifications,
    addResearchLog,
    addBuildLog,
    upvoteBounty,
    rsvpEvent
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
