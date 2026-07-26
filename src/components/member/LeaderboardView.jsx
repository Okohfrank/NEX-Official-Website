import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { CredentialCard } from '../UI/CredentialCard';
import { supabase } from '../../lib/supabase';
import { Trophy, Award, Sparkles, Share2, Medal, CheckCircle2, X, Search, Filter } from 'lucide-react';

export const LeaderboardView = () => {
  const { leaderboard, currentUser } = useApp();
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [liveLeaderboard, setLiveLeaderboard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  useEffect(() => {
    async function loadLeaderboard() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('points', { ascending: false });

        if (data && data.length > 0) {
          const formatted = data.map((p, index) => ({
            rank: index + 1,
            name: p.name || p.full_name || 'Member',
            dept: p.faculty_dept || p.dept || 'Engineering',
            points: p.points || 100,
            badge: index === 0 ? 'Top Contributor' : index === 1 ? 'Research Lead' : index === 2 ? 'Build Specialist' : 'Verified Contributor',
            skillBadges: p.skills || ['Research', 'Engineering']
          }));
          setLiveLeaderboard(formatted);
        }
      } catch (e) {}
    }
    loadLeaderboard();
  }, []);

  const displayList = liveLeaderboard.length > 0 ? liveLeaderboard : leaderboard;

  const filteredList = displayList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || item.dept.includes(deptFilter);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="black">CYCLE RANKINGS</Badge>
            <span className="text-xs text-slate-300 font-semibold">2026 First Cycle</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">Leaderboard & Recognition System</h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">Earn points through skill-tagged build entries, research logs, and peer nominations.</p>
        </div>

        <button
          onClick={() => setShowCredentialModal(true)}
          className="flex items-center justify-center gap-2 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Award className="w-4 h-4 text-white shrink-0" />
          <span>Generate LinkedIn Credential Card</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search contributor or dept..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[#2FA137]"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Environmental">Environmental Sciences</option>
            <option value="Science">Science</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="font-black text-base text-[#060721] flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#2FA137]" />
            <span>Cycle 2026 Top Student Contributors</span>
          </div>
          <span className="text-xs text-slate-500 font-normal">Showing {filteredList.length} members</span>
        </h3>

        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                <th className="py-3">Rank</th>
                <th className="py-3">Member</th>
                <th className="py-3">Faculty / Dept</th>
                <th className="py-3">Skill Badges</th>
                <th className="py-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((m) => (
                <tr key={m.rank} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-black text-[#060721]">
                    {m.rank === 1 ? '#1 🥇' : m.rank === 2 ? '#2 🥈' : m.rank === 3 ? '#3 🥉' : `#${m.rank}`}
                  </td>
                  <td className="py-3 pr-2">
                    <p className="font-black text-[#060721] text-sm">{m.name}</p>
                    <span className="text-[10px] text-slate-500 font-bold">{m.badge}</span>
                  </td>
                  <td className="py-3 text-slate-600 font-medium pr-2">{m.dept}</td>
                  <td className="py-3 pr-2">
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(m.skillBadges) ? m.skillBadges : (Array.isArray(m.badges) ? m.badges : [])).map((b, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-bold">{b}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-right font-black text-[#060721] text-sm">
                    {m.points} PTS
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credential Modal */}
      {showCredentialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-auto">
            <button
              onClick={() => setShowCredentialModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300 font-bold text-xs flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              <span>Close Modal</span>
            </button>
            <CredentialCard
              memberName={currentUser.name || "Member"}
              roleName="Interdisciplinary Research Specialist"
              topic="Clean Hydro Bio-Filter Unit"
              cycle="2026 First Cycle"
            />
          </div>
        </div>
      )}
    </div>
  );
};
