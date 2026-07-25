import React from 'react';
import { useApp } from '../../context/AppContext';
import {
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
  Sparkles,
  LogOut
} from 'lucide-react';

export const Sidebar = () => {
  const { userRole, activeTab, setActiveTab, currentUser, logout } = useApp();

  if (userRole === 'public') return null;

  const handleLogout = () => {
    logout();
  };

  const isAdmin = userRole === 'exec_admin';

  const adminItems = [
    { id: 'admin_overview', label: 'Admin Overview & Stats', icon: ShieldAlert },
    { id: 'admin_placement', label: 'Groups & Placement Engine', icon: UserCheck },
    { id: 'admin_proposals', label: 'Proposal Review Queue', icon: Award },
    { id: 'admin_content', label: 'Content & Exec Manager', icon: Sparkles }
  ];

  const memberCore = [
    { id: 'dashboard', label: 'Member Dashboard', icon: LayoutDashboard },
    { id: 'mygroup', label: 'My Group & Roster', icon: Users },
    { id: 'profile', label: 'My Profile & Portfolio', icon: User }
  ];

  const workspaceItems = [
    { id: 'research', label: 'Research Workspace', icon: BookOpen },
    { id: 'proposal', label: 'Proposal Submission', icon: Send },
    { id: 'build', label: 'Build Module', icon: Hammer },
    { id: 'publish', label: 'Publishing Compiler', icon: FileCheck2 }
  ];

  const communityItems = [
    { id: 'leaderboard', label: 'Leaderboard & Badges', icon: Trophy },
    { id: 'bounties', label: 'Problem Bounty Board', icon: HelpCircle },
    { id: 'events', label: 'Events & Workshops', icon: Calendar },
    { id: 'directory', label: 'Member Directory', icon: Contact }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 bg-white border-r border-slate-200/90 p-5 space-y-6 min-h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-6">
        {isAdmin ? (
          /* Executive Admin Console Navigation ONLY */
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#060721] text-white space-y-1 border border-slate-800 shadow-md">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2FA137] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ADMIN CONSOLE</span>
              </span>
              <p className="text-xs font-black">Executive Operations</p>
            </div>

            <div>
              <h4 className="text-[10px] font-extrabold text-[#2FA137] uppercase tracking-widest px-2 mb-2">
                Executive Administration
              </h4>
              <div className="space-y-1">
                {adminItems.map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#060721] text-white shadow-md'
                          : 'text-slate-700 hover:bg-slate-100/80 hover:text-[#060721]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#2FA137]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Student Member Navigation ONLY */
          <>
            {/* Nav Group: Member Core */}
            <div>
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
                MEMBER HUB
              </h4>
              <div className="space-y-1">
                {memberCore.map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#2FA137] text-white shadow-md shadow-emerald-600/20'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav Group: Research & Build Workspaces */}
            <div>
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
                PIPELINE WORKSPACES
              </h4>
              <div className="space-y-1">
                {workspaceItems.map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#2FA137] text-white shadow-md shadow-emerald-600/20'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav Group: Community Tools */}
            <div>
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
                COMMUNITY & RECOGNITION
              </h4>
              <div className="space-y-1">
                {communityItems.map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-[#2FA137] text-white shadow-md shadow-emerald-600/20'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sidebar Bottom Profile Tile & Log Out */}
      <div className="pt-4 border-t border-slate-200/80 space-y-3 shrink-0">
        <div className="flex items-center gap-2.5">
          {currentUser.photoUrl || currentUser.avatar ? (
            <img
              src={currentUser.photoUrl || currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-xl object-cover border border-[#2FA137] shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-[#060721] text-white font-black text-xs flex items-center justify-center shrink-0">
              {currentUser.name ? currentUser.name[0] : (isAdmin ? 'A' : 'M')}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-[#060721] truncate">{currentUser.name || (isAdmin ? 'Executive Admin' : 'Member')}</p>
            <p className="text-[10px] text-slate-500 font-semibold truncate capitalize">{userRole.replace(/_/g, ' ')}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/60 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
