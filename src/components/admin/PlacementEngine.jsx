import React, { useState } from 'react';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { UserCheck, Users, Plus, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlacementEngine = () => {
  const [unplacedMembers, setUnplacedMembers] = useState([
    { id: 1, name: "David Olanrewaju", dept: "Engineering (Electrical)", level: "300L", focus: "Energy", skills: ["Embedded Systems", "Circuit Design"] },
    { id: 2, name: "Blessing Okon", dept: "Environmental Sciences", level: "400L", focus: "Waste", skills: ["GIS", "Urban Planning"] },
    { id: 3, name: "Emmanuel Kalu", dept: "Agriculture (Agronomy)", level: "300L", focus: "Agriculture", skills: ["Soil Science", "Hydroponics"] },
    { id: 4, name: "Seyi Makinde", dept: "Engineering (Mechanical)", level: "500L", focus: "Water", skills: ["CAD 3D", "Fluid Dynamics"] },
    { id: 5, name: "Zainab Bello", dept: "Engineering (Computer)", level: "400L", focus: "Digital Innovation", skills: ["Python", "IoT", "AI"] }
  ]);

  const [placedGroups, setPlacedGroups] = useState([
    { name: "Group Gamma - Smart Agriculture", focus: "Agriculture", membersCount: 5 }
  ]);

  const handleAutoAssemble = () => {
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    setPlacedGroups([
      ...placedGroups,
      { name: "Group Delta - Interdisciplinary Energy Team", focus: "Energy", membersCount: 5 }
    ]);
    setUnplacedMembers([]);
  };

  return (
    <div className="space-y-8 animate-in fade-in bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERDISCIPLINARY PLACEMENT ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-[#060721]">Admin Group Placement Control</h1>
          <p className="text-xs text-slate-600 font-medium">Assembles verified students into 5-6 member teams across Engineering, Agriculture, and Environmental Sciences.</p>
        </div>

        <button
          onClick={handleAutoAssemble}
          disabled={unplacedMembers.length === 0}
          className={`flex items-center gap-2 font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all ${
            unplacedMembers.length > 0
              ? 'bg-[#2FA137] hover:bg-[#26892c] text-white shadow-emerald-600/20'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Auto-Balance & Assemble 5-Member Team</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Unplaced Pool */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2FA137]" />
            <span>Verified Unplaced Member Pool ({unplacedMembers.length})</span>
          </h3>

          {unplacedMembers.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-xs text-slate-500 font-medium">
              <CheckCircle2 className="w-8 h-8 text-[#2FA137] mx-auto mb-2" />
              All verified members placed into interdisciplinary groups for 2026 First Cycle!
            </div>
          ) : (
            <div className="space-y-3">
              {unplacedMembers.map(m => (
                <div key={m.id} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#060721] text-xs">{m.name} ({m.level})</h4>
                      <p className="text-[11px] text-slate-500">{m.dept}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200">{m.focus}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {m.skills.map((s, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assembled Groups */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#2FA137]" />
            <span>Assembled Interdisciplinary Groups</span>
          </h3>

          <div className="space-y-3">
            {placedGroups.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="font-black text-[#060721] text-sm">{g.name}</h4>
                  <p className="text-xs text-[#2FA137] font-semibold">{g.focus} Focus Area • {g.membersCount} Members</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200">Placed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
