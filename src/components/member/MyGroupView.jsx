import React from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Users, GraduationCap, ShieldCheck, ExternalLink, Mail, Award, BookOpen } from 'lucide-react';

export const MyGroupView = () => {
  const { currentUser, setActiveTab } = useApp();

  const group = currentUser.group || {
    name: "Group Alpha - Clean Hydro Systems",
    focusArea: "Water Focus",
    status: "Researching",
    members: [
      { name: "Nkechi Eze", dept: "Environmental Sciences", role: "Environmental Lead" },
      { name: "Segun Arinze", dept: "Engineering (Chemical)", role: "Chemical Analyst" },
      { name: "Fatima Bello", dept: "Agriculture (Soil Science)", role: "Agricultural Specialist" },
      { name: "Tobi Bakre", dept: "Engineering (Mechanical)", role: "CAD & Fluid Dynamics" },
      { name: "Emeka Okonkwo", dept: "Engineering (Computer)", role: "IoT Firmware" }
    ]
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in">
      {/* Group Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-black dark:bg-zinc-900 text-white border border-zinc-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="black">{group.focusArea}</Badge>
            <Badge variant="green">{group.status}</Badge>
          </div>
          <h1 className="text-xl sm:text-3xl font-black">{group.name}</h1>
          <p className="text-xs text-zinc-400 mt-1">Interdisciplinary Team • 5 Members Placed by Admin</p>
        </div>

        <button
          onClick={() => setActiveTab('research')}
          className="flex items-center justify-center gap-2 bg-white text-black font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg hover:opacity-90 transition-all shrink-0 w-full sm:w-auto"
        >
          <BookOpen className="w-4 h-4 text-black" />
          <span>Open Guided Research Workspace</span>
        </button>
      </div>

      {/* Team Roster Grid */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-black dark:text-white">
          Interdisciplinary Team Roster
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.members.map((member, idx) => (
            <GlassCard key={idx} className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-extrabold text-lg flex items-center justify-center shadow-md">
                  {member.name[0]}
                </div>
                <div>
                  <h4 className="font-extrabold text-black dark:text-white text-sm">{member.name}</h4>
                  <p className="text-[11px] text-zinc-500 font-semibold">{member.role}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs">
                <p className="text-[10px] text-zinc-400 font-bold uppercase">Department</p>
                <p className="font-bold text-black dark:text-white mt-0.5">{member.dept}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
