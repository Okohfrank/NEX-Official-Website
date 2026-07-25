import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Users, Hammer, Eye, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const RoleSwitcherBar = () => {
  const { userRole, changeRole, resetAllData } = useApp();
  const [open, setOpen] = useState(false);

  const roles = [
    { id: 'public', label: 'Public Guest', icon: Eye },
    { id: 'unplaced_member', label: 'Verified Member', icon: User },
    { id: 'group_member_research', label: 'Research Team', icon: Users },
    { id: 'group_member_selected', label: 'Build Team', icon: Hammer },
    { id: 'exec_admin', label: 'Executive Admin', icon: Shield }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-zinc-950 text-white rounded-2xl p-4 shadow-2xl border border-zinc-800 space-y-3 w-72 animate-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Role Simulator
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            {roles.map(r => {
              const Icon = r.icon;
              const active = userRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    changeRole(r.id);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#2FA137] text-white font-black shadow-md'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-800">
            <button
              onClick={() => {
                resetAllData();
                setOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Session Storage</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#060721] text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl border border-zinc-700 hover:scale-105 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#2FA137]" />
          <span>Simulate Role ({userRole.replace(/_/g, ' ')})</span>
        </button>
      )}
    </div>
  );
};
