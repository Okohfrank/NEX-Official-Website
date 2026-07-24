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
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { userRole, activeTab, setActiveTab, currentUser } = useApp();

  if (userRole === 'public') return null;

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
    <aside className="hidden md:block w-64 shrink-0 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-6 shadow-sm h-fit">
      {/* Nav Group: Member Core */}
      <div>
        <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-2 mb-2">
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
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
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
          <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-2 mb-2">
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
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
        <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-2 mb-2">
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
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
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
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-2 mb-2 flex items-center gap-1.5">
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
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

      {/* Subtle Sidebar Bottom Profile Tile */}
      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs flex items-center justify-center shrink-0">
          {currentUser.name ? currentUser.name[0] : 'U'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold text-black dark:text-white truncate">{currentUser.name}</p>
          <p className="text-[10px] text-zinc-400 capitalize truncate">{userRole.replace('_', ' ')}</p>
        </div>
      </div>
    </aside>
  );
};
