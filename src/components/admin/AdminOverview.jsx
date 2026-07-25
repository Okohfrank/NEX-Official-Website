import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../UI/StatCard';
import { supabase } from '../../lib/supabase';
import { 
  ShieldAlert, 
  Users, 
  Award, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw,
  Plus,
  Sparkles,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminOverview = () => {
  const { 
    setActiveTab, 
    awardMemberPoints, 
    issueCertificate, 
    certificates, 
    leaderboard 
  } = useApp();

  const [stats, setStats] = useState({
    totalMembers: 142,
    unplacedCount: 12,
    activeGroups: 24,
    pendingProposals: 8,
    selectedProjects: 4
  });
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState(null);

  // Forms
  const [awardStudent, setAwardStudent] = useState('Oyewole Samod Atanda');
  const [awardPointsVal, setAwardPointsVal] = useState('150');
  const [awardBadgeVal, setAwardBadgeVal] = useState('Water Systems Specialist');

  const [certRecipient, setCertRecipient] = useState('George Ikechukwu');
  const [certTitle, setCertTitle] = useState('2026 Interdisciplinary Hydro-Filter Project Completion');
  const [certType, setCertType] = useState('Project Completion Certificate');

  const fetchAdminStats = async () => {
    setLoading(true);
    try {
      const { data: profiles } = await supabase.from('profiles').select('id, role');
      const totalM = profiles && profiles.length > 0 ? profiles.length : 142;
      const unplacedM = profiles && profiles.length > 0 ? profiles.filter(p => p.role === 'unplaced_member').length : 12;

      const { data: groups } = await supabase.from('placed_groups').select('id');
      const activeG = groups && groups.length > 0 ? groups.length : 24;

      const { data: proposals } = await supabase.from('proposals').select('id, status');
      const pendingP = proposals && proposals.length > 0 ? proposals.filter(p => p.status === 'Under Review').length : 8;
      const selectedP = proposals && proposals.length > 0 ? proposals.filter(p => p.status === 'Approved').length : 4;

      setStats({
        totalMembers: totalM,
        unplacedCount: unplacedM,
        activeGroups: activeG,
        pendingProposals: pendingP,
        selectedProjects: selectedP
      });
    } catch (err) {
      // Smooth fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const handleAwardSubmit = (e) => {
    e.preventDefault();
    if (!awardStudent) return;

    try {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
      awardMemberPoints(awardStudent, awardPointsVal, awardBadgeVal);
      setActionMsg(`Successfully awarded +${awardPointsVal} Points and '${awardBadgeVal}' Badge to ${awardStudent}!`);
    } catch (err) {
      console.error('Award error:', err);
    }
  };

  const handleIssueCertSubmit = (e) => {
    e.preventDefault();
    if (!certRecipient || !certTitle) return;

    try {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }
      issueCertificate(certRecipient, certTitle, certType);
      setActionMsg(`CV Certificate issued to ${certRecipient} for "${certTitle}"!`);
    } catch (err) {
      console.error('Certificate issue error:', err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in w-full">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>EXECUTIVE ADMINISTRATION DASHBOARD</span>
          </div>
          <h1 className="text-2xl font-black text-[#060721]">Cross-Cycle Governance & Analytics</h1>
          <p className="text-xs text-slate-600 font-medium">Executive controls for interdisciplinary placement, proposal scoring, certificate issuance, and points recognition.</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={fetchAdminStats}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setActiveTab('admin_placement')}
            className="bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
          >
            <span>Manage Group Placement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-[#2FA137] border border-emerald-200 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionMsg}</span>
          </div>
          <button onClick={() => setActionMsg(null)} className="font-extrabold text-slate-400 hover:text-slate-700">✕</button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Registered Members" value={stats.totalMembers} subtext={`${stats.unplacedCount} Unplaced In Pool`} icon={Users} />
        <StatCard label="Active Interdisciplinary Groups" value={stats.activeGroups} subtext="Researching & Building" icon={CheckCircle2} />
        <StatCard label="Proposals Pending Review" value={stats.pendingProposals} subtext="Review Gate Open" icon={AlertCircle} />
        <StatCard label="Selected Build Projects" value={stats.selectedProjects} subtext="Capped Limit Reached" icon={Award} />
      </div>

      {/* Quick Nav Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setActiveTab('admin_placement')} 
          className="bg-white p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#2FA137]/40 transition-all cursor-pointer group space-y-3"
        >
          <h3 className="font-black text-base text-[#060721] group-hover:text-[#2FA137] transition-colors">Interdisciplinary Placement Engine</h3>
          <p className="text-xs text-slate-600 font-medium">View unplaced verified members and assemble 5-6 student teams across Engineering, Agriculture, and Environmental Sciences.</p>
          <span className="text-xs font-bold text-[#2FA137] group-hover:translate-x-1 transition-transform inline-block">Launch Placement Engine →</span>
        </div>

        <div 
          onClick={() => setActiveTab('admin_proposals')} 
          className="bg-white p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#2FA137]/40 transition-all cursor-pointer group space-y-3"
        >
          <h3 className="font-black text-base text-[#060721] group-hover:text-[#2FA137] transition-colors">Proposal Review Queue & Scoring</h3>
          <p className="text-xs text-slate-600 font-medium">Perform 5-axis technical review scoring (Feasibility, Rigor, Scope, Safety, Skill Use) and assign decision states.</p>
          <span className="text-xs font-bold text-[#2FA137] group-hover:translate-x-1 transition-transform inline-block">Open Review Queue →</span>
        </div>
      </div>

      {/* Admin Action Section: Award Points/Badges & Issue CV Certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Award Points & Badges */}
        <form onSubmit={handleAwardSubmit} className="lg:col-span-6 bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
            <Trophy className="w-5 h-5 text-[#2FA137]" />
            <span>Award Member Points & Badges (PRD 3.9)</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Member *</label>
            <select
              value={awardStudent}
              onChange={e => setAwardStudent(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-bold"
            >
              {leaderboard.map(m => (
                <option key={m.id} value={m.name}>{m.name} ({m.dept}) — Currently {m.points} pts</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Points to Award</label>
              <input
                type="number"
                min={10}
                max={1000}
                value={awardPointsVal}
                onChange={e => setAwardPointsVal(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Grant Skill Badge</label>
              <select
                value={awardBadgeVal}
                onChange={e => setAwardBadgeVal(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-semibold"
              >
                <option value="Water Systems Specialist">Water Systems Specialist</option>
                <option value="AI Contributor">AI Contributor</option>
                <option value="Embedded Firmware Expert">Embedded Firmware Expert</option>
                <option value="Founding Cohort">Founding Cohort</option>
                <option value="Research Rigor Award">Research Rigor Award</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Award Points & Grant Skill Badge</span>
          </button>
        </form>

        {/* Issue CV Certificates */}
        <form onSubmit={handleIssueCertSubmit} className="lg:col-span-6 bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
            <Award className="w-5 h-5 text-[#2FA137]" />
            <span>Issue Official CV-Ready Certificate (PRD 3.9)</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Certificate Recipient Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. George Ikechukwu"
              value={certRecipient}
              onChange={e => setCertRecipient(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Certificate Type</label>
              <select
                value={certType}
                onChange={e => setCertType(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-semibold"
              >
                <option value="Project Completion Certificate">Project Completion Certificate</option>
                <option value="Workshop Certificate">Workshop Certificate</option>
                <option value="Research Integrity Certificate">Research Integrity Certificate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Project / Workshop Title</label>
              <input
                type="text"
                required
                placeholder="Title of completed project..."
                value={certTitle}
                onChange={e => setCertTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#060721] hover:bg-[#060721]/90 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-[#2FA137]" />
            <span>Generate & Issue Official Certificate</span>
          </button>
        </form>
      </div>

      {/* Issued Certificates List */}
      <div className="bg-white p-6 border border-slate-200/90 shadow-sm space-y-3">
        <h4 className="font-black text-sm text-[#060721]">Issued CV Certificates Register ({certificates.length})</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certificates.map(cert => (
            <div key={cert.id} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-[#2FA137]">{cert.type}</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">{cert.code}</span>
              </div>
              <p className="font-black text-[#060721] text-sm">{cert.recipient}</p>
              <p className="text-slate-600 font-medium">{cert.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
