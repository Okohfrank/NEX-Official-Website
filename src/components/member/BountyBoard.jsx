import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { supabase } from '../../lib/supabase';
import { HelpCircle, ThumbsUp, Plus, CheckCircle2 } from 'lucide-react';

export const BountyBoard = () => {
  const { bounties, userUpvotedBounties, upvoteBounty, currentUser, showToast } = useApp();
  const [showSubmit, setShowSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Engineering Tech');
  const [desc, setDesc] = useState('');
  const [liveBounties, setLiveBounties] = useState([]);

  const loadBounties = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from('bounties').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setLiveBounties(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadBounties();
  }, []);

  const handleCreateBounty = async () => {
    if (!title.trim() || !desc.trim()) {
      showToast({ title: 'Validation Error', message: 'Please enter both title and description.', type: 'error' });
      return;
    }

    if (supabase) {
      try {
        await supabase.from('bounties').insert([{
          title: title.trim(),
          domain: domain,
          submitted_by: currentUser.name || 'Member',
          description: desc.trim(),
          votes: 1,
          status: 'Active'
        }]);
      } catch (e) {}
    }

    showToast({ title: 'Problem Submitted!', message: 'Community problem challenge saved to Supabase and published.', type: 'success' });
    setTitle('');
    setDesc('');
    setShowSubmit(false);
    loadBounties();
  };

  const displayBounties = liveBounties.length > 0 ? liveBounties : bounties;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full">
            COMMUNITY PROBLEM BOUNTY BOARD
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">Submit & Upvote Real-World Problems</h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">Report community challenges for executive consideration in upcoming NEX semester cycles.</p>
        </div>

        <button
          onClick={() => setShowSubmit(!showSubmit)}
          className="bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all shrink-0"
        >
          {showSubmit ? 'Cancel Submission' : '+ Report New Problem'}
        </button>
      </div>

      {/* Submission Form */}
      {showSubmit && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-[#060721]">Submit Community Problem</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Problem Title (e.g., Campus Organic Waste Sorting)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs outline-none focus:ring-2 focus:ring-[#2FA137]"
              />
            </div>
            <div>
              <select
                value={domain}
                onChange={e => setDomain(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-[#060721] font-bold text-xs outline-none focus:ring-2 focus:ring-[#2FA137]"
              >
                <option value="Engineering Tech">Engineering Tech</option>
                <option value="Agricultural Science">Agricultural Science</option>
                <option value="Environmental Systems">Environmental Systems</option>
                <option value="Software & AI">Software & AI</option>
              </select>
            </div>
          </div>

          <textarea
            rows={3}
            placeholder="Detailed description of the societal or campus problem..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs outline-none focus:ring-2 focus:ring-[#2FA137]"
          ></textarea>
          
          <button
            onClick={handleCreateBounty}
            className="px-5 py-2.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20"
          >
            Submit & Save to Supabase
          </button>
        </div>
      )}

      {/* Bounty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayBounties.map(b => {
          const id = b.id;
          const hasUpvoted = (userUpvotedBounties || []).includes(id);
          return (
            <div key={id} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-extrabold uppercase">
                    {b.domain || b.focusArea || 'Engineering'}
                  </span>
                  {b.status && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                      {b.status}
                    </span>
                  )}
                </div>

                <h3 className="font-black text-base text-[#060721]">{b.title}</h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{b.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Submitted by {b.submitted_by || b.submittedBy || 'Member'}</span>
                <button
                  onClick={() => upvoteBounty(id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                    hasUpvoted
                      ? 'bg-[#2FA137] text-white border-transparent shadow-xs'
                      : 'bg-emerald-50 text-[#2FA137] hover:bg-emerald-100 border-emerald-200'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'text-white' : 'text-[#2FA137]'}`} />
                  <span>{hasUpvoted ? `Upvoted (${b.votes || 1})` : `${b.votes || 1} Upvotes`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
