import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { CohortProjectsModal } from '../common/CohortProjectsModal';
import { 
  Calendar, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Sparkles, 
  FolderGit2, 
  ArrowRight,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export const EventsCalendar = () => {
  const { events, rsvpEvent, showToast } = useApp();
  const [liveEvents, setLiveEvents] = useState([]);
  const [userRsvpedMap, setUserRsvpedMap] = useState({});
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    async function loadEvents() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setLiveEvents(data);
        }
      } catch (e) {}
    }
    loadEvents();
  }, []);

  const handleRsvp = async (id, currentRsvps) => {
    setUserRsvpedMap(prev => ({ ...prev, [id]: true }));
    rsvpEvent(id);

    if (supabase) {
      try {
        await supabase
          .from('events')
          .update({ rsvps: (currentRsvps || 0) + 1 })
          .eq('id', id);
      } catch (e) {}
    }

    showToast({ title: 'RSVP Confirmed!', message: 'You are registered for this capacity building session.', type: 'success' });
  };

  const defaultSeedEvents = [
    {
      id: 'evt-seed-1',
      title: 'Interdisciplinary Engineering & Hardware Prototyping Workshop',
      category: 'Workshop',
      event_date: 'October 28, 2026',
      event_time: '11:00 AM - 2:00 PM',
      location: 'Faculty of Engineering Auditorium, LASU Epe',
      speaker: 'Atolagbe Yusuf (Technical Lead)',
      rsvps: 48,
      description: 'Hands-on training session on embedded IoT sensors, CAD prototyping, and transitioning bench research into tangible student prototypes.'
    },
    {
      id: 'evt-seed-2',
      title: 'Founding Cohort Final Project Showcase & Evaluation Gala',
      category: 'Cohort Showcase',
      event_date: 'November 05, 2026',
      event_time: '10:00 AM - 3:30 PM',
      location: 'Engineering Multi-Purpose Hall & Virtual Stream',
      speaker: 'Executive Council & Industry Panel',
      rsvps: 112,
      description: 'Official presentation and jury assessment of projects developed by Cohort 1 teams across Water, Energy, Waste, and Mobility.'
    },
    {
      id: 'evt-seed-3',
      title: 'Research Methodology & Technical Paper Publishing Seminar',
      category: 'Seminar',
      event_date: 'November 18, 2026',
      event_time: '1:00 PM - 3:00 PM',
      location: 'Virtual Workshop (Google Meet)',
      speaker: 'Engr. Oyewole Samod Atanda (Founder)',
      rsvps: 76,
      description: 'Structuring university research findings into peer-reviewed publication standards and intellectual property disclosures.'
    }
  ];

  const sourceEvents = liveEvents.length > 0 ? liveEvents : (events && events.length > 0 ? events : defaultSeedEvents);

  const categories = ['All', 'Workshop', 'Cohort Showcase', 'Seminar'];

  const filteredEvents = sourceEvents.filter(ev => {
    if (categoryFilter === 'All') return true;
    return (ev.category || 'Workshop').toLowerCase() === categoryFilter.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* 1. Header Banner */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2FA137]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              NEX INNOVATION CALENDAR
            </span>
            <span className="text-[10px] font-extrabold uppercase bg-white/10 text-slate-300 px-3 py-1 rounded-full">
              Harmattan 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Events, Workshops & Cohort Milestones
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Participate in technical workshops, hardware hacking sessions, and celebrate milestones achieved by our interdisciplinary research groups.
          </p>
        </div>
      </div>

      {/* 2. DEDICATED COHORT FEATURE CARD & BUTTON (Directly addressing Frank's request) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-emerald-950 via-[#060721] to-slate-900 border border-emerald-500/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#2FA137] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <Sparkles className="w-3 h-3" />
            FEATURED COHORT HIGHLIGHT
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            NEX Cohort 1 Student Submissions & Prototypes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Review the solar PA systems, smart commute interfaces, waste-to-energy models, and water purification units submitted by our student project groups.
          </p>
        </div>

        <button
          onClick={() => setIsCohortModalOpen(true)}
          className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 hover:scale-[1.03] transition-all"
        >
          <FolderGit2 className="w-4 h-4" />
          <span>View Cohort Projects</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-[#060721] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-bold">
          Showing {filteredEvents.length} Event{filteredEvents.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* 4. Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(ev => {
          const isRsvped = userRsvpedMap[ev.id] || ev.userRsvped;
          const rsvpsCount = (ev.rsvps || 0) + (userRsvpedMap[ev.id] ? 1 : 0);

          return (
            <div 
              key={ev.id} 
              className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-black uppercase tracking-wider">
                    {ev.category || 'Workshop'}
                  </span>
                  <span className="text-xs text-[#060721] bg-slate-100 px-3 py-1 rounded-full font-bold">
                    {rsvpsCount} RSVPed
                  </span>
                </div>

                <h3 className="font-black text-lg sm:text-xl text-[#060721] leading-snug">
                  {ev.title}
                </h3>

                {ev.description && (
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {ev.description}
                  </p>
                )}

                <div className="space-y-2 pt-1 text-xs text-slate-700 font-semibold">
                  <p className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#2FA137] shrink-0" />
                    <span>{ev.event_date || ev.date || 'Oct 2026'}</span>
                    {(ev.event_time || ev.time) && (
                      <span className="text-slate-400 font-normal">• {ev.event_time || ev.time}</span>
                    )}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#2FA137] shrink-0" />
                    <span>{ev.location || 'Faculty of Engineering Auditorium'}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-[#2FA137] shrink-0" />
                    <span>Speaker / Lead: {ev.speaker || 'NEX Technical Lead'}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {ev.category === 'Cohort Showcase' ? (
                  <button
                    onClick={() => setIsCohortModalOpen(true)}
                    className="text-xs font-bold text-[#2FA137] hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Cohort Submissions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">Free Access for All Members</span>
                )}

                <button
                  onClick={() => handleRsvp(ev.id, ev.rsvps)}
                  disabled={isRsvped}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isRsvped
                      ? 'bg-emerald-50 text-[#2FA137] border border-emerald-200 cursor-default flex items-center gap-1.5'
                      : 'bg-[#2FA137] hover:bg-[#26892c] text-white shadow-md shadow-emerald-600/20 active:scale-95'
                  }`}
                >
                  {isRsvped ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>RSVP Confirmed</span>
                    </>
                  ) : (
                    '1-Click RSVP'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Cohort Modal */}
      <CohortProjectsModal 
        isOpen={isCohortModalOpen}
        onClose={() => setIsCohortModalOpen(false)}
      />
    </div>
  );
};
