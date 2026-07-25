import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserPlus, 
  Menu, 
  X, 
  ChevronRight, 
  LogOut,
  Bell,
  CheckCheck,
  Check,
  LayoutDashboard,
  Users,
  User,
  BookOpen,
  Send,
  Hammer,
  FileCheck2,
  Trophy,
  HelpCircle,
  Calendar,
  Contact,
  ShieldAlert,
  UserCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { 
    userRole, 
    activeTab, 
    setActiveTab, 
    currentUser, 
    logout,
    notifications,
    markAllNotificationsRead,
    markNotificationRead
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  const landingNavItems = [
    { id: 'hero', label: 'Home' },
    { id: 'focus-areas', label: 'Focus Areas' },
    { id: 'founder', label: 'Founder & Vision' },
    { id: 'executives', label: 'Executive Council' },
    { id: 'showcase', label: 'Public Showcase' },
    { id: 'partnerships', label: 'Partnerships' },
    { id: 'archive', label: 'Publications' }
  ];

  const isWorkspaceView = [
    'dashboard', 'mygroup', 'profile', 'research', 'proposal', 'build', 'publish',
    'leaderboard', 'bounties', 'events', 'directory',
    'admin_overview', 'admin_placement', 'admin_proposals', 'admin_content'
  ].includes(activeTab);

  const handleLandingScroll = (secId) => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
    setTimeout(() => {
      const el = document.getElementById(secId);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isWorkspaceView || activeTab !== 'home') return;

    const sectionIds = landingNavItems.map(item => item.id);
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isWorkspaceView, activeTab]);

  const isAdmin = userRole === 'exec_admin';

  const memberNavGroups = [
    {
      title: "MEMBER HUB",
      items: [
        { id: 'dashboard', label: 'Member Dashboard', icon: LayoutDashboard },
        { id: 'mygroup', label: 'My Group & Roster', icon: Users },
        { id: 'profile', label: 'My Profile & Portfolio', icon: User }
      ]
    },
    {
      title: "PIPELINE WORKSPACES",
      items: [
        { id: 'research', label: 'Research Workspace', icon: BookOpen },
        { id: 'proposal', label: 'Proposal Submission', icon: Send },
        { id: 'build', label: 'Build Module', icon: Hammer },
        { id: 'publish', label: 'Publishing Compiler', icon: FileCheck2 }
      ]
    },
    {
      title: "COMMUNITY & RECOGNITION",
      items: [
        { id: 'leaderboard', label: 'Leaderboard & Badges', icon: Trophy },
        { id: 'bounties', label: 'Problem Bounty Board', icon: HelpCircle },
        { id: 'events', label: 'Events & Workshops', icon: Calendar },
        { id: 'directory', label: 'Member Directory', icon: Contact }
      ]
    }
  ];

  const adminNavItems = [
    { id: 'admin_overview', label: 'Admin Overview & Stats', icon: ShieldAlert },
    { id: 'admin_placement', label: 'Groups & Placement Engine', icon: UserCheck },
    { id: 'admin_proposals', label: 'Proposal Review Queue', icon: Award },
    { id: 'admin_content', label: 'Content & Exec Manager', icon: Sparkles }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-xs w-full transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between gap-3">
        {/* Brand Logo with 3-line text */}
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0" 
          onClick={() => setActiveTab(userRole === 'public' ? 'home' : (isAdmin ? 'admin_overview' : 'dashboard'))}
        >
          <img 
            src="/logo.png" 
            alt="NEX Emblem" 
            className="h-9 sm:h-10 w-auto object-contain" 
          />
          <div className="flex flex-col text-left text-[11px] font-black tracking-tight leading-[1.1]">
            <span className="text-[#060721]">NETWORK OF</span>
            <span className="text-[#060721]">ENGINEERING</span>
            <span className="text-[#2FA137] tracking-wider">XCELLENCE</span>
          </div>
        </div>

        {/* Public Desktop Navbar Links */}
        {!isWorkspaceView && (
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {landingNavItems.map(item => {
              const isActive = activeTab === 'home' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLandingScroll(item.id)}
                  className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-[#2FA137] shadow-xs'
                      : 'text-slate-700 hover:text-[#060721] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {userRole === 'public' ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setActiveTab('login')}
                className="px-6 py-2 text-xs font-bold text-slate-800 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-full transition-all shadow-xs"
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className="flex items-center gap-1.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md shadow-emerald-600/20 hover:scale-[1.02] transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join NEX</span>
              </button>
            </div>
          ) : (
            /* Logged in Header Actions: Notification Bell + User Avatar */
            <div className="flex items-center gap-2 relative">
              {/* Notification Bell Icon */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors relative"
                  title="Admin Notifications & Updates"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#060721]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2FA137] text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#2FA137]" />
                        <h4 className="font-black text-xs text-[#060721]">Admin Broadcasts & Updates</h4>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[10px] text-[#2FA137] font-bold hover:underline flex items-center gap-1"
                        >
                          <CheckCheck className="w-3 h-3" />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {(notifications || []).length === 0 ? (
                        <p className="text-xs text-slate-500 font-medium text-center py-4">No recent updates.</p>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3 rounded-2xl border text-xs space-y-1 cursor-pointer transition-all ${
                              n.read 
                                ? 'bg-slate-50 border-slate-200 text-slate-600' 
                                : 'bg-emerald-50/80 border-emerald-200 text-[#060721] font-bold shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] uppercase font-extrabold text-[#2FA137]">Platform Notification</span>
                              <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                            </div>
                            <p className="text-xs leading-relaxed">{n.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Logged-In User Profile Avatar Pill */}
              <div 
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 bg-slate-100 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-200/70 transition-colors"
              >
                {currentUser.photoUrl || currentUser.avatar ? (
                  <img
                    src={currentUser.photoUrl || currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-lg object-cover border border-[#2FA137]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-[#2FA137] text-white font-black text-[10px] flex items-center justify-center">
                    {currentUser.name ? currentUser.name[0] : 'U'}
                  </div>
                )}
                <span className="text-xs font-bold text-slate-900 hidden sm:block">
                  {currentUser.name}
                </span>
              </div>

              {/* Desktop Only Log Out Button */}
              <button
                onClick={() => logout()}
                className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200/60 transition-all"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}

          {/* Hamburger Menu Button for Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setShowNotifications(false);
            }}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Absolute Positioning prevents layout shift) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh] z-50"
          >
            {/* Logged-In Mobile Navigation Menu */}
            {userRole !== 'public' ? (
              <div className="space-y-4">
                {/* User Info Header Tile */}
                <div 
                  onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                  className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3 cursor-pointer"
                >
                  {currentUser.photoUrl || currentUser.avatar ? (
                    <img src={currentUser.photoUrl || currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-xl object-cover border border-[#2FA137]" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-[#060721] text-white font-black text-sm flex items-center justify-center">
                      {currentUser.name ? currentUser.name[0] : 'M'}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-[#060721] truncate">{currentUser.name || 'NEX Member'}</p>
                    <p className="text-[10px] text-[#2FA137] font-extrabold uppercase">{userRole.replace(/_/g, ' ')}</p>
                  </div>
                </div>

                {/* Admin Menu Links */}
                {isAdmin ? (
                  <div className="space-y-1">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-1">Executive Console</p>
                    {adminNavItems.map(item => {
                      const Icon = item.icon;
                      const active = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                            active ? 'bg-[#2FA137] text-white' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Member Menu Groups */
                  <div className="space-y-4">
                    {memberNavGroups.map((group, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-1">{group.title}</p>
                        {group.items.map(item => {
                          const Icon = item.icon;
                          const active = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                                active ? 'bg-[#2FA137] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              /* Public Mobile Menu */
              <>
                <div className="space-y-1">
                  {landingNavItems.map(item => {
                    const isActive = activeTab === 'home' && activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLandingScroll(item.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                          isActive ? 'bg-emerald-50 text-[#2FA137]' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#2FA137]' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => { setActiveTab('login'); setMobileMenuOpen(false); }}
                    className="py-2.5 px-4 rounded-full border border-slate-300 text-xs font-bold text-slate-800 text-center"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setActiveTab('register'); setMobileMenuOpen(false); }}
                    className="py-2.5 px-4 rounded-full bg-[#2FA137] text-xs font-bold text-white text-center shadow-sm"
                  >
                    Join NEX
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
