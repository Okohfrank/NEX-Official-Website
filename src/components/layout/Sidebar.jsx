import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
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
  const { userRole, activeTab, setActiveTab, currentUser, changeRole } = useApp();

  if (userRole === 'public') return null;

  const handleLogout = () => {
    changeRole('public');
    setActiveTab('home');
  };

  const getNavSections = () => {
    const memberCore = [
      { id: 'dashboard', label: 'Member Dashboard', icon: LayoutDashboard },
      { id: 'mygroup', label: 'My Group & Roster', icon: Users }
    ];

    const workspaceItems = [];
    if (userRole === 'group_member_research' || userRole === 'group_member_selected' || userRole === 'exec_admin') {
      workspaceItems.push({ id: 'research', label: 'Research Workspace', icon: BookOpen });
      workspaceItems.push({ id: 'proposal', label: 'Proposal Submission', icon: Send });
    }
    if (userRole === 'group_member_selected' || userRole === 'exec_admin') {
      workspaceItems.push({ id: 'build', label: 'Build Module', icon: Hammer });
      workspaceItems.push({ id: 'publish', label: 'Publishing Compiler', icon: FileCheck2 });
    }

    const communityItems = [
      { id: 'leaderboard', label: 'Leaderboard & Badges', icon: Trophy },
      { id: 'bounties', label: 'Problem Bounty Board', icon: HelpCircle },
      { id: 'events', label: 'Events & Workshops', icon: Calendar },
      { id: 'directory', label: 'Member Directory', icon: Contact }
    ];

    const adminItems = [
      { id: 'admin_overview', label: 'Admin Overview & Stats', icon: ShieldAlert },
      { id: 'admin_placement', label: 'Groups & Placement Engine', icon: UserCheck },
      { id: 'admin_proposals', label: 'Proposal Review Queue', icon: Award },
      { id: 'admin_content', label: 'Content & Exec Manager', icon: Sparkles }
    ];

    return { memberCore, workspaceItems, communityItems, adminItems };
  };

  const { memberCore, workspaceItems, communityItems, adminItems } = getNavSections();

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 bg-white border-r border-slate-200/90 p-5 space-y-6 min-h-[calc(100vh-4rem)]">
      <div className="flex-1 space-y-6">
        {/* Nav Group: Member Core */}
        <div>
          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Member Hub
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
        {workspaceItems.length > 0 && (
          <div>
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
              Pipeline Workspaces
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
        )}

        {/* Nav Group: Community Tools */}
        <div>
          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Community & Recognition
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

        {/* Nav Group: Admin Console */}
        {userRole === 'exec_admin' && (
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-[10px] font-extrabold text-[#2FA137] uppercase tracking-widest px-2 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Exec Administration</span>
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
        )}
      </div>

      {/* Sidebar Bottom Profile Tile & Log Out */}
      <div className="pt-4 border-t border-slate-200/80 space-y-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#060721] text-white font-black text-xs flex items-center justify-center shrink-0">
            {currentUser.name ? currentUser.name[0] : 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-[#060721] truncate">{currentUser.name || 'Member'}</p>
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
