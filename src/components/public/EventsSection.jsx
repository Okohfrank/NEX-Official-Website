import React, { useState } from 'react';
import { CohortProjectsModal } from '../common/CohortProjectsModal';
import { 
  Calendar, 
  MapPin, 
  UserCheck, 
  Sparkles, 
  FolderGit2, 
  ArrowRight,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export const EventsSection = () => {
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);

  const upcomingEvents = [
    {
      id: 'pub-evt-1',
      title: 'Founding Cohort Final Project Showcase & Evaluation Gala',
      category: 'Cohort Milestone',
      date: 'November 05, 2026',
      time: '10:00 AM - 3:30 PM',
      location: 'Engineering Multi-Purpose Hall & Live Virtual Stream',
      speaker: 'Executive Council & External Industry Panel',
      description: 'Public presentation and jury evaluation of technical solutions built by Cohort 1 teams across Water, Energy, Waste, and Mobility.'
    },
    {
      id: 'pub-evt-2',
      title: 'Interdisciplinary Engineering & Hardware Prototyping Workshop',
      category: 'Technical Workshop',
      date: 'October 28, 2026',
      time: '11:00 AM - 2:00 PM',
      location: 'Faculty of Engineering Auditorium, LASU Epe',
      speaker: 'Atolagbe Yusuf (Technical Lead)',
      description: 'Hands-on hardware development workshop focusing on IoT embedded sensors, CAD modeling, and translating theoretical research into working prototypes.'
    },
    {
      id: 'pub-evt-3',
      title: 'Research Methodology & Peer-Reviewed Publishing Seminar',
      category: 'Academic Seminar',
      date: 'November 18, 2026',
      time: '1:00 PM - 3:00 PM',
      location: 'Faculty of Engineering & Virtual Meet',
      speaker: 'Engr. Oyewole Samod Atanda (Founder)',
      description: 'Bridging undergraduate technical research with peer-reviewed publications and patent disclosure frameworks.'
    }
  ];

  return (
    <section id="events" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="w-full px-4 sm:px-8 lg:px-16 space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#2FA137] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            EVENTS & COHORT SHOWCASE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#060721] tracking-tight">
            NEX Events & Capacity Building
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Attend interdisciplinary masterclasses, research symposia, and discover the practical innovations produced by our student cohorts.
          </p>
        </div>

        {/* Highlighted Cohort Showcase Banner & Button (Frank's Core Requirement) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-r from-[#060721] via-slate-900 to-emerald-950 text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2FA137]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              COHORT 1 RESEARCH & BUILD CYCLE
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
              Explore Projects Built by Student Teams
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Browse submitted project slides, working mechanism videos, and full engineering reports from our founding student teams across Water, Energy, Waste, and Mobility domains.
            </p>
          </div>

          <button
            onClick={() => setIsCohortModalOpen(true)}
            className="relative z-10 shrink-0 flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/30 hover:scale-[1.03] transition-all"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>View Cohort Projects</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Upcoming Public Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map(ev => (
            <div 
              key={ev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-black uppercase tracking-wider">
                  {ev.category}
                </span>

                <h4 className="font-black text-base sm:text-lg text-[#060721] leading-snug">
                  {ev.title}
                </h4>

                <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                  {ev.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-700 font-semibold border-t border-slate-100">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#2FA137] shrink-0" />
                    <span>{ev.date}</span>
                    <span className="text-slate-400 font-normal">• {ev.time}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#2FA137] shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-[#2FA137] shrink-0" />
                    <span className="truncate">Speaker: {ev.speaker}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">Open to Students & Public</span>
                {ev.category === 'Cohort Milestone' && (
                  <button
                    onClick={() => setIsCohortModalOpen(true)}
                    className="text-xs font-bold text-[#2FA137] hover:underline flex items-center gap-1"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Projects Modal */}
      <CohortProjectsModal
        isOpen={isCohortModalOpen}
        onClose={() => setIsCohortModalOpen(false)}
      />
    </section>
  );
};
