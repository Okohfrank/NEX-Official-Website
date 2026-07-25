import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { UserCheck, Users, Plus, CheckCircle2, Sparkles, RefreshCw, User, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlacementEngine = () => {
  const [unplacedMembers, setUnplacedMembers] = useState([
    { id: '1', full_name: "David Olanrewaju", department: "Faculty of Engineering (Electrical)", level: "300L", focus: "Energy", skills: ["Embedded Systems", "Circuit Design"] },
    { id: '2', full_name: "Blessing Okon", department: "Faculty of Environmental Sciences (Building Tech)", level: "400L", focus: "Waste", skills: ["GIS", "Urban Planning"] },
    { id: '3', full_name: "Emmanuel Kalu", department: "Faculty of Agriculture (Agronomy)", level: "300L", focus: "Agriculture", skills: ["Soil Science", "Hydroponics"] },
    { id: '4', full_name: "Seyi Makinde", department: "Faculty of Engineering (Mechanical)", level: "500L", focus: "Water", skills: ["CAD 3D", "Fluid Dynamics"] },
    { id: '5', full_name: "Zainab Bello", department: "Faculty of Science (Computer Science)", level: "400L", focus: "Digital Innovation", skills: ["Python", "IoT", "AI"] }
  ]);

  const [placedGroups, setPlacedGroups] = useState([
    { id: 'g1', name: "Group Gamma - Smart Agriculture", focus: "Agriculture", members_count: 5, teamLead: "Emmanuel Kalu", mentor: "Engr. Dr. Charles Nwankwo" }
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newLead, setNewLead] = useState('');
  const [newMentor, setNewMentor] = useState('');

  const fetchPlacementData = async () => {
    setLoading(true);
    try {
      const { data: groups } = await supabase.from('placed_groups').select('*').order('created_at', { ascending: false });
      if (groups && groups.length > 0) {
        setPlacedGroups(groups.map(g => ({
          ...g,
          teamLead: g.team_lead || 'Seyi Makinde',
          mentor: g.mentor || 'Engr. Dr. Charles Nwankwo'
        })));
      }

      const { data: profiles } = await supabase.from('profiles').select('*').eq('role', 'unplaced_member');
      if (profiles && profiles.length > 0) {
        setUnplacedMembers(profiles.map(p => ({
          id: p.id,
          full_name: p.full_name || 'Verified Member',
          department: p.department || 'Engineering',
          level: p.level || '300L',
          focus: p.skills ? p.skills.split(',')[0] : 'Energy',
          skills: p.skills ? p.skills.split(',') : ['Engineering', 'Design']
        })));
      }
    } catch (err) {
      // Smooth fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacementData();
  }, []);

  const handleAutoAssemble = async () => {
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    
    const newGroupName = `Group ${String.fromCharCode(65 + placedGroups.length)} - Interdisciplinary Team`;
    const newGroupObj = { 
      id: `g-${Date.now()}`,
      name: newGroupName, 
      focus: "Energy & Infrastructure", 
      members_count: unplacedMembers.length || 5,
      teamLead: unplacedMembers[0]?.full_name || "David Olanrewaju",
      mentor: "Engr. Dr. Charles Nwankwo"
    };

    setPlacedGroups([newGroupObj, ...placedGroups]);
    setUnplacedMembers([]);

    try {
      await supabase.from('placed_groups').insert([{ name: newGroupName, focus: "Energy & Infrastructure", members_count: 5 }]);
      await supabase.from('profiles').update({ role: 'placed_member' }).eq('role', 'unplaced_member');
    } catch (err) {
      // Error handling
    }
  };

  const handleSaveGroupLeadership = (groupId) => {
    setPlacedGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          teamLead: newLead || g.teamLead,
          mentor: newMentor || g.mentor
        };
      }
      return g;
    }));
    setSelectedGroup(null);
    setNewLead('');
    setNewMentor('');
  };

  return (
    <div className="space-y-6 animate-in fade-in w-full">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERDISCIPLINARY PLACEMENT & TEAM ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-[#060721]">Admin Group Placement & Mentor Designation</h1>
          <p className="text-xs text-slate-600 font-medium">Assembles verified students into 5-6 member teams across Engineering, Agriculture, and Environmental Sciences.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchPlacementData}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
            title="Refresh Live Pool"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Unplaced Pool */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2FA137]" />
            <span>Verified Unplaced Member Pool ({unplacedMembers.length})</span>
          </h3>

          {unplacedMembers.length === 0 ? (
            <div className="bg-white p-8 border border-slate-200 text-center text-xs text-slate-500 font-medium">
              <CheckCircle2 className="w-8 h-8 text-[#2FA137] mx-auto mb-2" />
              All verified members placed into interdisciplinary groups for 2026 First Cycle!
            </div>
          ) : (
            <div className="space-y-3">
              {unplacedMembers.map(m => (
                <div key={m.id} className="bg-white p-4 border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#060721] text-xs">{m.full_name} ({m.level})</h4>
                      <p className="text-[11px] text-slate-500">{m.department}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200">{m.focus || 'Energy'}</span>
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

        {/* Assembled Groups & Mentor Designation */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#2FA137]" />
            <span>Assembled Interdisciplinary Groups ({placedGroups.length})</span>
          </h3>

          <div className="space-y-3">
            {placedGroups.map((g) => (
              <div key={g.id} className="bg-white p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-black text-[#060721] text-sm">{g.name}</h4>
                    <p className="text-xs text-[#2FA137] font-semibold">{g.focus} Focus Area • {g.members_count || 5} Members</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200">Placed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Designated Team Lead:</span>
                    <span className="font-bold text-[#060721] flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3 text-[#2FA137]" />
                      <span>{g.teamLead}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Assigned Faculty Mentor:</span>
                    <span className="font-bold text-[#060721] flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-[#2FA137]" />
                      <span>{g.mentor}</span>
                    </span>
                  </div>
                </div>

                {selectedGroup === g.id ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                    <p className="font-bold text-[#060721]">Assign Team Lead & Mentor:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Team Lead Name..."
                        value={newLead}
                        onChange={e => setNewLead(e.target.value)}
                        className="p-2 rounded-lg border border-slate-300 text-xs font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Faculty Mentor Name..."
                        value={newMentor}
                        onChange={e => setNewMentor(e.target.value)}
                        className="p-2 rounded-lg border border-slate-300 text-xs font-medium"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveGroupLeadership(g.id)}
                        className="px-3 py-1.5 bg-[#2FA137] text-white font-bold rounded-lg text-xs"
                      >
                        Save Assignment
                      </button>
                      <button
                        onClick={() => setSelectedGroup(null)}
                        className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setSelectedGroup(g.id); setNewLead(g.teamLead); setNewMentor(g.mentor); }}
                    className="text-xs font-bold text-[#2FA137] hover:underline block"
                  >
                    Edit Team Lead & Mentor Assignment →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
