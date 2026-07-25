import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Search, Filter, Mail, Users } from 'lucide-react';

export const MemberDirectory = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');

  const members = [
    { name: "Nkechi Eze", dept: "Environmental Sciences", skills: ["GIS Mapping", "CAD Design", "Environmental Impact"], focus: "Water" },
    { name: "Tunde Lawal", dept: "Mechanical Engineering", skills: ["CAD 3D", "Thermodynamics", "Prototyping"], focus: "Energy" },
    { name: "Sam Charles", dept: "Computer Engineering", skills: ["Embedded Systems", "React", "Python", "IoT"], focus: "Digital Innovation" },
    { name: "Chidinma Nwosu", dept: "Agriculture", skills: ["Smart Farming", "Soil Science", "Post-Harvest"], focus: "Agriculture" },
    { name: "Segun Arinze", dept: "Chemical Engineering", skills: ["Polymer Synthesis", "Fluid Dynamics", "Lab Analysis"], focus: "Waste" }
  ];

  const filtered = members.filter(m => {
    return m.name.toLowerCase().includes(search.toLowerCase()) ||
           m.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
           m.dept.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner - Dark Background / White Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full">
            NEX STUDENT NETWORK
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">Member Directory</h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">Connect with students across faculties for cross-disciplinary consultation and peer mentorship.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by skill, name or dept..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs outline-none w-56 sm:w-72 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Directory Grid - White Background / Black Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#060721] text-white font-black text-sm flex items-center justify-center shrink-0 border border-slate-800">
                {m.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-black text-[#060721] text-sm truncate">{m.name}</h4>
                <p className="text-xs text-slate-600 font-medium truncate">{m.dept}</p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Tagged Skills</span>
              <div className="flex flex-wrap gap-1">
                {m.skills.map((sk, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-bold">{sk}</span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-[#2FA137] font-extrabold">{m.focus} Focus</span>
              <button
                onClick={() => showToast({ title: 'Contact Request Sent', message: `Direct messaging link initiated for ${m.name} (${m.dept}).`, type: 'info' })}
                className="text-[#060721] hover:text-[#2FA137] flex items-center gap-1 font-bold"
              >
                <Mail className="w-3.5 h-3.5 text-[#2FA137]" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
