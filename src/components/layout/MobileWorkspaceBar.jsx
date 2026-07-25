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
  Sparkles
} from 'lucide-react';

export const MobileWorkspaceBar = () => {
  const { userRole, activeTab, setActiveTab } = useApp();

  if (userRole === 'public') return null;

  const getWorkspaceItems = () => {
    // If Executive Admin, show only Executive Admin Console tools
    if (userRole === 'exec_admin') {
      return [
        { id: 'admin_overview', label: 'Admin Stats', icon: ShieldAlert },
        { id: 'admin_placement', label: 'Placement', icon: UserCheck },
        { id: 'admin_proposals', label: 'Review Queue', icon: Award },
        { id: 'admin_content', label: 'Content', icon: Sparkles }
      ];
    }

    return [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'mygroup', label: 'My Group', icon: Users },
      { id: 'profile', label: 'My Profile', icon: User },
      { id: 'research', label: 'Research', icon: BookOpen },
      { id: 'proposal', label: 'Proposal', icon: Send },
      { id: 'build', label: 'Build', icon: Hammer },
      { id: 'publish', label: 'Publish', icon: FileCheck2 },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
      { id: 'bounties', label: 'Bounties', icon: HelpCircle },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'directory', label: 'Directory', icon: Contact }
    ];
  };

  const items = getWorkspaceItems();

  return (
    <div className="md:hidden w-full overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none mb-4">
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
                  ? 'bg-[#060721] text-white border-transparent shadow-md font-extrabold'
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#2FA137]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
