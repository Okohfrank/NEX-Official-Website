import React, { useState } from 'react';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Search, Filter, Mail, Users } from 'lucide-react';

export const MemberDirectory = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const members = [
    { name: "Nkechi Eze", dept: "Environmental Sciences", skills: ["GIS Mapping", "CAD Design", "Environmental Impact"], focus: "Water" },
    { name: "Tunde Lawal", dept: "Mechanical Engineering", skills: ["CAD 3D", "Thermodynamics", "Prototyping"], focus: "Energy" },
    { name: "Sam Charles", dept: "Computer Engineering", skills: ["Embedded Systems", "React", "Python", "IoT"], focus: "Digital Innovation" },
    { name: "Chidinma Nwosu", dept: "Agriculture", skills: ["Smart Farming", "Soil Science", "Post-Harvest"], focus: "Agriculture" },
    { name: "Segun Arinze", dept: "Chemical Engineering", skills: ["Polymer Synthesis", "Fluid Dynamics", "Lab Analysis"], focus: "Waste" }
  ];

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchDept = deptFilter === 'All' || m.dept.includes(deptFilter);
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-sky-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="sky">NEX STUDENT NETWORK</Badge>
          <h1 className="text-2xl font-extrabold font-display mt-1">Member Directory</h1>
          <p className="text-xs text-slate-300">Connect with students across faculties for cross-disciplinary consultation and peer mentorship.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by skill or name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-800 text-white text-xs outline-none w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m, idx) => (
          <GlassCard key={idx} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 font-bold text-base flex items-center justify-center font-display">
                {m.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{m.name}</h4>
                <p className="text-xs text-slate-400">{m.dept}</p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Tagged Skills</span>
              <div className="flex flex-wrap gap-1">
                {m.skills.map((sk, i) => (
                  <Badge key={i} variant="purple">{sk}</Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-sky-500 font-semibold">{m.focus} Focus</span>
              <button
                onClick={() => alert(`Connecting with ${m.name}...`)}
                className="text-slate-400 hover:text-sky-500 flex items-center gap-1 font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
