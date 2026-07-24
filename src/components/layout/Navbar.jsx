import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Menu,
  X,
  UserPlus,
  ChevronRight,
  LogOut
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    userRole,
    currentUser,
    notifications,
    logout
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const landingNavItems = [
    { id: 'hero', label: 'Home' },
    { id: 'founder', label: 'About Us' },
    { id: 'featured-projects', label: 'Projects' },
    { id: 'focus-areas', label: 'Missions' },
    { id: 'leadership', label: 'Membership' },
    { id: 'publications', label: 'Resources' },
    { id: 'partnerships', label: 'Contact' },
  ];

  const handleLandingScroll = (secId) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(secId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    setMobileMenuOpen(false);
  };

  const isWorkspaceView = [
    'dashboard', 'mygroup', 'research', 'proposal', 'build', 'publish',
    'leaderboard', 'bounties', 'events', 'directory',
    'admin_overview', 'admin_placement', 'admin_proposals', 'admin_content'
  ].includes(activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-none shadow-none max-w-full overflow-x-hidden transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo with 3-line text */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => handleLandingScroll('hero')}>
          <img 
            src="/logo.png" 
            alt="NEX Emblem" 
            className="h-11 w-auto object-contain" 
          />
          <div className="flex flex-col text-[11px] md:text-xs font-black tracking-tight leading-[1.1]">
            <span className="text-[#060721]">NETWORK OF</span>
            <span className="text-[#060721]">ENGINEERING</span>
            <span className="text-[#2FA137] tracking-wider">XCELLENCE</span>
          </div>
        </div>

        {/* Desktop Landing Links */}
        {!isWorkspaceView && (
          <nav className="hidden lg:flex items-center gap-6">
            {landingNavItems.map((item, idx) => {
              const isActive = idx === 0 && activeTab === 'home';
              return (
                <button
                  key={item.id}
                  onClick={() => handleLandingScroll(item.id)}
                  className={`relative py-1 text-xs font-bold transition-all ${
                    isActive ? 'text-[#2FA137]' : 'text-slate-700 hover:text-[#2FA137]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2FA137] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Workspace Title Indicator on Desktop */}
        {isWorkspaceView && (
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-[#2FA137]"></span>
            <span className="capitalize">{activeTab.replace('_', ' ')} Workspace</span>
          </div>
        )}

        {/* Right Actions & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notifications Center */}
          {userRole !== 'public' && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2FA137]"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3 z-50 animate-in fade-in">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <h4 className="font-extrabold text-xs text-slate-900">Notifications</h4>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <p className="text-slate-800 font-medium">{n.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Auth buttons ON HEADER */}
          {userRole === 'public' ? (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => { setActiveTab('login'); setMobileMenuOpen(false); }}
                className="px-6 py-2 text-xs font-bold text-slate-800 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-full transition-all shadow-xs"
              >
                Login
              </button>
              <button
                onClick={() => { setActiveTab('register'); setMobileMenuOpen(false); }}
                className="flex items-center gap-1.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md shadow-emerald-600/20 hover:scale-[1.02] transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join NEX</span>
              </button>
            </div>
          ) : (
            /* Logged in User Badge ON HEADER */
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <div className="w-5 h-5 rounded-full bg-[#2FA137] text-white font-bold text-[10px] flex items-center justify-center">
                  {currentUser.name ? currentUser.name[0] : 'U'}
                </div>
                <span className="text-xs font-bold text-slate-900 hidden sm:block">
                  {currentUser.name}
                </span>
                <span className="text-[10px] font-extrabold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md hidden md:block capitalize">
                  {userRole.replace('_', ' ')}
                </span>
              </div>

              <button
                onClick={() => logout()}
                className="px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200/60 transition-all flex items-center gap-1"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          )}

          {/* Hamburger Menu Button for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-xl overflow-hidden"
          >
            {!isWorkspaceView && (
              <div className="space-y-1">
                {landingNavItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleLandingScroll(item.id)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}

            {userRole === 'public' && (
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
