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

export const MobileWorkspaceBar = () => {
  const { userRole, activeTab, setActiveTab } = useApp();

  if (userRole === 'public') return null;

  const getWorkspaceItems = () => {
    const items = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'mygroup', label: 'My Group', icon: Users }
    ];

    if (userRole === 'group_member_research' || userRole === 'group_member_selected' || userRole === 'exec_admin') {
      items.push({ id: 'research', label: 'Research', icon: BookOpen });
      items.push({ id: 'proposal', label: 'Proposal', icon: Send });
    }
    if (userRole === 'group_member_selected' || userRole === 'exec_admin') {
      items.push({ id: 'build', label: 'Build', icon: Hammer });
      items.push({ id: 'publish', label: 'Publish', icon: FileCheck2 });
    }

    items.push({ id: 'leaderboard', label: 'Leaderboard', icon: Trophy });
    items.push({ id: 'bounties', label: 'Bounties', icon: HelpCircle });
    items.push({ id: 'events', label: 'Events', icon: Calendar });
    items.push({ id: 'directory', label: 'Directory', icon: Contact });

    if (userRole === 'exec_admin') {
      items.push({ id: 'admin_overview', label: 'Admin Stats', icon: ShieldAlert });
      items.push({ id: 'admin_placement', label: 'Placement', icon: UserCheck });
      items.push({ id: 'admin_proposals', label: 'Review Queue', icon: Award });
      items.push({ id: 'admin_content', label: 'Content', icon: Sparkles });
    }

    return items;
  };

  const items = getWorkspaceItems();

  return (
    <div className="md:hidden w-full overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none mb-4">
      <div className="flex items-center gap-2 shrink-0 px-1">
        {items.map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                active
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-md font-extrabold'
                  : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
