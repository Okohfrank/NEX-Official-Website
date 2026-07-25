import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { Award, CheckCircle2, RefreshCw, Star, Send, Lock, AlertCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProposalReviewQueue = () => {
  const { topicChangeRequests, handleTopicChangeReview } = useApp();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewerFeedbackText, setReviewerFeedbackText] = useState({});

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('proposals').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setProposals(data);
      } else {
        setProposals([
          {
            id: "prop-101",
            group_name: "Group Alpha - Clean Hydro Systems",
            focus_area: "Water",
            title: "Solar Water Kiosk with Bio-Sand Filtration",
            status: "Under Review",
            feasibility: 4, rigor: 5, scope: 4, safety: 5, skill_use: 4,
            feedback: "Excellent literature review and clear safety protocol for iron precipitate disposal."
          },
          {
            id: "prop-102",
            group_name: "Group Beta - Circular Plastics",
            focus_area: "Waste",
            title: "Plastic Waste to Eco-Thermal Bricks",
            status: "Under Review",
            feasibility: 5, rigor: 4, scope: 4, safety: 4, skill_use: 5,
            feedback: "Strong interdisciplinary synergy between Chemical Engineering and Building Technology."
          }
        ]);
      }
    } catch (err) {
      // Smooth fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleDecision = async (id, newStatus, feedbackText) => {
    if (newStatus === 'Approved') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: newStatus, feedback: feedbackText || p.feedback } : p));

    try {
      await supabase.from('proposals').update({ status: newStatus, feedback: feedbackText }).eq('id', id);
    } catch (err) {
      // Error handling
    }
  };

  const handleScoreChange = async (id, axis, val) => {
    const updatedVal = Math.min(5, Math.max(1, parseInt(val) || 1));
    setProposals(prev => prev.map(p => p.id === id ? { ...p, [axis]: updatedVal } : p));
    try {
      await supabase.from('proposals').update({ [axis]: updatedVal }).eq('id', id);
    } catch (err) {}
  };

  return (
    <div className="space-y-6 animate-in fade-in w-full">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60 mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>PROPOSAL REVIEW & RESEARCH GOVERNANCE QUEUE</span>
          </div>
          <h1 className="text-2xl font-black text-[#060721]">Executive 5-Axis Technical Scoring & Topic Lock Control</h1>
          <p className="text-xs text-slate-600 font-medium">Perform 5-axis technical review scoring, issue feedback, and review topic change requests (PRD Section 3.5).</p>
        </div>

        <button
          onClick={fetchProposals}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all self-start sm:self-auto"
          title="Refresh Proposals"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* SECTION 1: Topic Lock & Change Request Review (PRD 3.5 & 3.11) */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
          <Lock className="w-5 h-5 text-[#2FA137]" />
          <span>Research Topic Change Requests Queue (PRD Section 3.5)</span>
        </h3>

        {topicChangeRequests.length === 0 ? (
          <p className="text-xs text-slate-500 font-medium">No pending topic change requests.</p>
        ) : (
          <div className="space-y-4">
            {topicChangeRequests.map(tcr => (
              <div key={tcr.id} className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-amber-200/60 pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-amber-900">{tcr.groupName}</span>
                    <h4 className="font-black text-[#060721] text-sm mt-0.5">Topic Lock Modification Request</h4>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 w-fit">{tcr.status}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-amber-200/60">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Current Locked Topic:</span>
                    <p className="font-bold text-slate-700">{tcr.currentTopic}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#2FA137] block uppercase">Proposed New Topic:</span>
                    <p className="font-black text-[#060721]">{tcr.proposedTopic}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Reason for Topic Change:</span>
                  <p className="text-slate-700 font-medium mt-0.5">{tcr.reason}</p>
                </div>

                {tcr.status === 'Pending Review' ? (
                  <div className="flex gap-2 pt-2 border-t border-amber-200/60">
                    <button
                      onClick={() => handleTopicChangeReview(tcr.id, true, 'Approved by Technical Lead')}
                      className="px-4 py-2 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-xs"
                    >
                      Approve & Relock Topic
                    </button>
                    <button
                      onClick={() => handleTopicChangeReview(tcr.id, false, 'Denied: Maintain current topic scope')}
                      className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs"
                    >
                      Reject Request
                    </button>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-emerald-800">Review Completed ({tcr.status}).</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: Initial Proposals 5-Axis Review Sheet */}
      <div className="space-y-4">
        <h3 className="font-black text-base text-[#060721] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#2FA137]" />
          <span>Pending Semester Proposals Review Queue ({proposals.length})</span>
        </h3>

        <div className="space-y-6">
          {proposals.map(p => (
            <div key={p.id} className="bg-white p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] text-[#2FA137] font-extrabold uppercase">{p.group_name}</span>
                  <h3 className="text-lg font-black text-[#060721]">{p.title}</h3>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${
                  p.status === 'Approved' ? 'bg-emerald-50 text-[#2FA137] border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {p.status}
                </span>
              </div>

              {/* Interactive 5-Axis Scoring matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 text-xs text-center">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium mb-1">1. Tech Feasibility</p>
                  <select 
                    value={p.feasibility || 4} 
                    onChange={(e) => handleScoreChange(p.id, 'feasibility', e.target.value)}
                    className="font-black text-[#2FA137] bg-white border border-emerald-200 rounded-lg px-2 py-1 outline-none text-xs"
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} / 5</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium mb-1">2. Research Rigor</p>
                  <select 
                    value={p.rigor || 4} 
                    onChange={(e) => handleScoreChange(p.id, 'rigor', e.target.value)}
                    className="font-black text-[#2FA137] bg-white border border-emerald-200 rounded-lg px-2 py-1 outline-none text-xs"
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} / 5</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium mb-1">3. Realistic Scope</p>
                  <select 
                    value={p.scope || 4} 
                    onChange={(e) => handleScoreChange(p.id, 'scope', e.target.value)}
                    className="font-black text-[#2FA137] bg-white border border-emerald-200 rounded-lg px-2 py-1 outline-none text-xs"
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} / 5</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium mb-1">4. Safety Awareness</p>
                  <select 
                    value={p.safety || 4} 
                    onChange={(e) => handleScoreChange(p.id, 'safety', e.target.value)}
                    className="font-black text-[#2FA137] bg-white border border-emerald-200 rounded-lg px-2 py-1 outline-none text-xs"
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} / 5</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium mb-1">5. Skill Synergy</p>
                  <select 
                    value={p.skill_use || 4} 
                    onChange={(e) => handleScoreChange(p.id, 'skill_use', e.target.value)}
                    className="font-black text-[#2FA137] bg-white border border-emerald-200 rounded-lg px-2 py-1 outline-none text-xs"
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} / 5</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Mandatory Written Reviewer Feedback</label>
                <textarea
                  rows={2}
                  value={p.feedback || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setProposals(prev => prev.map(item => item.id === p.id ? { ...item, feedback: val } : item));
                  }}
                  placeholder="Enter technical reviewer feedback..."
                  className="w-full text-xs text-slate-700 p-3 rounded-xl bg-slate-50 border border-slate-300 font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
                ></textarea>
              </div>

              {/* Decision Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleDecision(p.id, 'Approved', p.feedback)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve for Development</span>
                </button>

                <button
                  onClick={() => handleDecision(p.id, 'Approved with Revisions', p.feedback)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-100 border border-amber-200 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Request Revisions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
