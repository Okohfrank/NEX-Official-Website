import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { supabase } from '../../lib/supabase';
import { Users, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

export const MyGroupView = () => {
  const { currentUser, setActiveTab } = useApp();
  const [liveGroup, setLiveGroup] = useState(null);

  useEffect(() => {
    async function loadGroup() {
      if (!supabase) return;
      try {
        const { data } = await supabase.from('placed_groups').select('*').limit(1);
        if (data && data.length > 0) {
          setLiveGroup(data[0]);
        }
      } catch (e) {}
    }
    loadGroup();
  }, []);

  const groupName = liveGroup ? (liveGroup.name || liveGroup.group_name) : (currentUser.group ? currentUser.group.name : "Group Alpha - Clean Hydro Systems");
  const focusArea = liveGroup ? (liveGroup.focusArea || liveGroup.focus_area || "Water Focus") : "Water Focus";
  const status = liveGroup ? (liveGroup.status || "Researching") : "Researching";
  
  const membersList = liveGroup ? (
    Array.isArray(liveGroup.members) ? liveGroup.members : (
      typeof liveGroup.members === 'string' ? JSON.parse(liveGroup.members) : [
        { name: currentUser.name || "Member", dept: currentUser.dept || "Faculty of Engineering", role: "Team Lead" }
      ]
    )
  ) : (
    currentUser.group ? currentUser.group.members : [
      { name: currentUser.name || "Member", dept: currentUser.dept || "Faculty of Engineering", role: "Team Lead" }
    ]
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in">
      {/* Group Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="black">{focusArea}</Badge>
            <Badge variant="green">{status}</Badge>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">{groupName}</h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">Interdisciplinary Team • Placed Group Roster</p>
        </div>

        <button
          onClick={() => setActiveTab('research')}
          className="flex items-center justify-center gap-2 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg transition-all shrink-0 w-full sm:w-auto"
        >
          <BookOpen className="w-4 h-4 text-white" />
          <span>Open Guided Research Workspace</span>
        </button>
      </div>

      {/* Team Roster Grid */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-[#060721]">
          Interdisciplinary Team Roster
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {membersList.map((member, idx) => (
            <GlassCard key={idx} className="space-y-4 p-5 sm:p-6 bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#060721] text-white font-black text-lg flex items-center justify-center shadow-md border border-slate-800">
                  {(member.name || member.full_name || 'M')[0]}
                </div>
                <div>
                  <h4 className="font-black text-[#060721] text-sm">{member.name || member.full_name}</h4>
                  <p className="text-xs text-slate-700 font-bold">{member.role || 'Research Member'}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Department</p>
                <p className="font-extrabold text-[#060721] mt-0.5">{member.dept || member.faculty_dept || 'Faculty of Engineering'}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
