import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CohortProjectsModal } from '../common/CohortProjectsModal';
import { 
  Calendar, 
  MapPin, 
  UserCheck, 
  Sparkles, 
  FolderGit2, 
  ArrowRight, 
  ArrowLeft,
  X, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Lightbulb, 
  BookOpen, 
  Play, 
  ExternalLink,
  Layers,
  Repeat
} from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 'evt-webinar',
    title: 'From Ideas to Impact: Research & Innovation Webinar',
    category: 'Research & Innovation Webinar',
    badgeText: 'Keynote Masterclass',
    speaker: 'Dr. Tunde Alawode',
    speakerTitle: 'MIT Alumnus • Co-Founder, dot Learn',
    speakerBio: 'Dr. Tunde Alawode is an MIT alumnus, mechanical engineer, clean-energy researcher, and entrepreneur. He was the Best Graduating Student at the University of Lagos before pursuing graduate studies at MIT. He is also a co-founder of dot Learn, an educational technology venture working to make digital learning more accessible.',
    speakerJourney: 'His journey demonstrates how curiosity, research, and a commitment to solving real problems can lead to meaningful innovation.',
    images: ['/R&D Webinar.jpeg', '/Dr Tunde.png'],
    preview: 'What if the problems we complain about every day could become the foundation for groundbreaking innovations?',
    description: 'NEX hosted a Research & Innovation Webinar featuring Dr. Tunde Alawode, an MIT alumnus, researcher, entrepreneur, and former Best Graduating Student of the University of Lagos, to challenge students to rethink research and its role in solving real-world problems.',
    callToAction: 'Discover how this initiative inspired students to move beyond identifying problems and begin developing practical solutions.',
    problem: 'Many students have become so accustomed to the challenges around them that they rarely consider research and innovation as practical ways to address them. Even final-year projects can become academic requirements rather than genuine attempts to solve real problems.',
    solution: 'NEX organized this webinar to challenge that mindset and introduce students to a more practical, research-driven approach to problem-solving.',
    whatWeLearned: 'During the session, Dr. Tunde shared insights from his academic and entrepreneurial journey, including the development of dot Learn. He emphasized the importance of identifying problems within one\'s immediate environment, asking the right research questions, narrowing problems to manageable scopes, and testing ideas through simple prototypes.',
    aiNote: 'He also encouraged students to use artificial intelligence as a thinking partner rather than a substitute for independent thought.',
    impact: 'The webinar brought together students interested in research, engineering, innovation, and entrepreneurship. With a peak attendance of 78 participants, the session generated encouraging feedback, with students reaching out afterward to share how insightful and motivating they found the discussion.',
    legacy: 'More importantly, the webinar laid the groundwork for NEX\'s six-week Research & Innovation Cohort, through which students would investigate real problems and work towards practical solutions.',
    closing: 'For NEX, this was more than a webinar. It was a step towards building a culture where students see research as a tool for transforming their environment.',
    watchLink: 'https://drive.google.com/file/d/1tOO8B1r56lw4-y13a-TgDyF9gFERH8ji/view?usp=sharing',
    peakAttendance: 78,
    date: 'Recent Keynote',
    time: '2-Hour Intensive Session',
    location: 'Virtual Masterclass & Live Q&A'
  },
  {
    id: 'evt-cohort',
    title: 'Founding Cohort Final Project Showcase & Evaluation Gala',
    category: 'Cohort Milestone',
    badgeText: 'Cohort 1 Research & Build Cycle',
    speaker: 'Executive Council & External Industry Panel',
    speakerTitle: 'Technical Reviewers & Jury',
    images: ['/R&D cohort.png'],
    preview: 'Following the inspiring Research & Innovation Webinar, NEX launched its 6-week Research & Innovation Cohort, challenging multidisciplinary student teams to investigate real community challenges.',
    description: 'Browse submitted project slides, working mechanism videos, and full engineering reports from our founding student teams across Water, Energy, Waste, and Mobility domains.',
    callToAction: 'Explore the working mechanism videos, project decks, and technical reports built by our founding cohort.',
    problem: 'Undergraduate engineering often confines students to abstract textbook exercises with limited opportunity to build, test, and present tangible physical prototypes.',
    solution: 'NEX engineered the 6-Week Research & Innovation Cohort to mentor, fund, and guide cross-disciplinary student teams in translating theoretical designs into validated community solutions.',
    whatWeLearned: 'Teams engineered working solutions including solar-powered public address systems, IoT smart water purifiers, plastic waste upcycling insulation bricks, and bioenergy digesters.',
    aiNote: 'Students utilized computational design tools, CAD simulation frameworks, and embedded IoT firmware to accelerate their prototypes.',
    impact: '8 multi-disciplinary teams submitted working engineering reports, presentation slides, and hardware demonstration videos evaluated by academic and industry juries.',
    legacy: 'This milestone establishes NEX as the premier platform for collegiate technical innovation and patent-track research at Lagos State University.',
    closing: 'Building a generation of student engineers who do not just graduate with degrees, but with deployed real-world solutions.',
    isCohort: true,
    date: 'November 05, 2026',
    time: '10:00 AM - 3:30 PM',
    location: 'Engineering Multi-Purpose Hall & Live Virtual Stream'
  },
  {
    id: 'evt-workshop',
    title: 'Interdisciplinary Engineering & Hardware Prototyping Workshop',
    category: 'Technical Workshop',
    badgeText: 'Hardware Lab',
    speaker: 'Atolagbe Yusuf',
    speakerTitle: 'Technical & Research Lead',
    images: [],
    preview: 'Hands-on hardware development workshop focusing on IoT embedded sensors, CAD modeling, and translating theoretical research into working prototypes.',
    description: 'An interactive laboratory session bridging CAD modeling, microcontrollers, sensor integration, and rapid fabrication techniques for aspiring student inventors.',
    callToAction: 'Learn the exact methodologies required to take a hardware concept from schematic diagram to working functional benchtop prototype.',
    problem: 'Many students lack hands-on exposure to embedded programming, sensor calibration, and rapid prototyping tools before their final year.',
    solution: 'This intensive technical masterclass provides practical workbench training with microcontrollers, IoT data telemetry, and circuit prototyping.',
    whatWeLearned: 'Attendees learn how to select sensors, model custom enclosures in CAD, write efficient embedded C/C++ firmware, and safely test electrical loads.',
    aiNote: 'Focus on integrating edge computing microcontrollers with modern telemetry protocols.',
    impact: 'Equips prospective cohort participants with the hardware engineering skills needed for competitive project submissions.',
    legacy: 'Part of NEX continuous capacity building initiative across Lagos State University campuses.',
    closing: 'Bridging classroom theory with workbench mastery.',
    date: 'October 28, 2026',
    time: '11:00 AM - 2:00 PM',
    location: 'Faculty of Engineering Auditorium, LASU Epe'
  },
  {
    id: 'evt-seminar',
    title: 'Research Methodology & Peer-Reviewed Publishing Seminar',
    category: 'Academic Seminar',
    badgeText: 'Research Publishing',
    speaker: 'Engr. Oyewole Samod Atanda',
    speakerTitle: 'Founder, NEX • Chemical & Polymer Engineer',
    images: [],
    preview: 'Bridging undergraduate technical research with peer-reviewed publications and patent disclosure frameworks.',
    description: 'A comprehensive academic symposium detailing how undergraduate project work can be structured, formatted, and published in top-tier peer-reviewed engineering journals.',
    callToAction: 'Elevate your research from campus coursework to internationally recognized scholarly papers and intellectual property disclosures.',
    problem: 'Valuable undergraduate technical research frequently remains unpublished and inaccessible to the broader scientific community after grading.',
    solution: 'NEX provides an end-to-end framework teaching students academic literature synthesis, rigorous citation standards, and submission protocols.',
    whatWeLearned: 'Techniques for formulating peer-reviewed manuscripts, conducting structured literature reviews, structuring datasets, and engaging with journal editors.',
    aiNote: 'Leveraging modern scientific research databases responsibly for comprehensive literature indexing.',
    impact: 'Paves the way for student researchers to gain international citations, graduate scholarships, and patent protections.',
    legacy: 'Fostering a long-term academic publishing culture within the university.',
    closing: 'Transforming undergraduate work into permanent scholarly contributions.',
    date: 'November 18, 2026',
    time: '1:00 PM - 3:00 PM',
    location: 'Faculty of Engineering & Virtual Meet'
  }
];

/* ─── Image Slider Component (Webinar swipe/click) ─── */
const ImageSlider = ({ images, title }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const next = (e) => {
    e?.stopPropagation();
    setCurrent(i => (i + 1) % images.length);
  };

  const prev = (e) => {
    e?.stopPropagation();
    setCurrent(i => (i - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-neutral-800 select-none group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={e => e.stopPropagation()}
    >
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`${title} - slide ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all shadow-md z-10 opacity-80 group-hover:opacity-100"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all shadow-md z-10 opacity-80 group-hover:opacity-100"
            aria-label="Next Image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? 'bg-[#2FA137] w-6' : 'bg-white/60 hover:bg-white w-2'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ─── Detailed Event Modal ─── */
const EventDetailModal = ({ event, onClose, onOpenCohortModal }) => {
  if (!event) return null;

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-20 bg-black/75 backdrop-blur-md cursor-pointer overflow-y-auto animate-in fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-neutral-800 cursor-default mb-10 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 dark:bg-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-200 transition-colors z-30 shadow-md"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Header */}
        {event.images && event.images.length > 0 && (
          <div className="w-full">
            <ImageSlider images={event.images} title={event.title} />
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#2FA137]">
              {event.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#060721] dark:text-white leading-tight">
              {event.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {event.description}
            </p>
          </div>

          {/* Meta Info */}
          {(event.date || event.speaker) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800 text-xs">
              {event.date && (
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                  <Calendar className="w-4 h-4 text-[#2FA137] shrink-0" />
                  <span>{event.date} • {event.time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                  <MapPin className="w-4 h-4 text-[#2FA137] shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              )}
              {event.speaker && (
                <div className="col-span-1 sm:col-span-2 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                  <UserCheck className="w-4 h-4 text-[#2FA137] shrink-0" />
                  <span><strong>Speaker:</strong> {event.speaker} ({event.speakerTitle || 'Keynote'})</span>
                </div>
              )}
            </div>
          )}

          {/* The Problem */}
          {event.problem && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#2FA137]" />
                <h4 className="font-black text-sm text-[#060721] dark:text-white">The Problem</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{event.problem}</p>
              {event.solution && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{event.solution}</p>
              )}
            </div>
          )}

          {/* About the Speaker */}
          {event.speakerBio && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#2FA137]" />
                <h4 className="font-black text-sm text-[#060721] dark:text-white">About the Speaker</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{event.speakerBio}</p>
              {event.speakerJourney && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">{event.speakerJourney}</p>
              )}
            </div>
          )}

          {/* What We Learned */}
          {event.whatWeLearned && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2FA137]" />
                <h4 className="font-black text-sm text-[#060721] dark:text-white">What We Learned</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{event.whatWeLearned}</p>
              {event.aiNote && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{event.aiNote}</p>
              )}
              {event.impact && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{event.impact}</p>
              )}
              {event.legacy && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{event.legacy}</p>
              )}
              {event.closing && (
                <p className="text-xs sm:text-sm text-[#060721] dark:text-slate-200 leading-relaxed font-semibold italic">{event.closing}</p>
              )}
            </div>
          )}

          {/* Peak Attendance */}
          {event.peakAttendance && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <Users className="w-5 h-5 text-[#2FA137]" />
              <div>
                <p className="text-xs font-bold text-[#060721] dark:text-white">Peak Attendance</p>
                <p className="text-sm font-black text-[#2FA137]">{event.peakAttendance} participants</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 flex flex-col sm:flex-row gap-3">
            {event.watchLink && (
              <a
                href={event.watchLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Watch the Webinar</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            )}

            {event.isCohort && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCohortModal();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>View Cohort Projects</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="py-3.5 px-6 rounded-2xl border border-slate-200 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main EventsSection Component with Stacking & Tilting Animation ─── */
export const EventsSection = () => {
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Card Stacking State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const containerRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const hoverTimerRef = useRef(null);

  const totalEvents = EVENTS_DATA.length;

  // Next / Shuffle function
  const handleNext = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % totalEvents);
      setIsShuffling(false);
    }, 280);
  }, [isShuffling, totalEvents]);

  // Previous function
  const handlePrev = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setActiveIndex(prev => (prev - 1 + totalEvents) % totalEvents);
      setIsShuffling(false);
    }, 280);
  }, [isShuffling, totalEvents]);

  // Jump to specific index
  const handleSelectIndex = (idx) => {
    if (idx === activeIndex || isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsShuffling(false);
    }, 280);
  };

  // Hover on behind card: deliberate hover intent so passing over with the mouse does NOT trigger accidentally
  const handleBehindMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      handleNext();
    }, 800);
  };

  const handleBehindMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  // Scroll-driven shuffle: requires deliberate, intentional downward scroll delta through the section
  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;

      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;

      if (inView && delta > 0) {
        accumulatedDelta += delta;
        const now = Date.now();
        // Requires at least 420px of intentional downward scroll through the section and 3.5s cooldown
        if (accumulatedDelta >= 420 && now - lastScrollTimeRef.current > 3500) {
          lastScrollTimeRef.current = now;
          accumulatedDelta = 0;
          handleNext();
        }
      } else if (!inView) {
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, [handleNext]);

  // Calculate stack orders
  const currentEvent = EVENTS_DATA[activeIndex];
  const nextIndex = (activeIndex + 1) % totalEvents;
  const nextEvent = EVENTS_DATA[nextIndex];
  const thirdIndex = (activeIndex + 2) % totalEvents;
  const thirdEvent = EVENTS_DATA[thirdIndex];

  return (
    <section id="events" className="py-16 sm:py-24 bg-slate-50 dark:bg-black border-t border-slate-200/80 dark:border-neutral-900 transition-colors">
      <div className="w-full px-4 sm:px-8 lg:px-16 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#2FA137]">
            EVENTS & CAPACITY BUILDING
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#060721] dark:text-white tracking-tight">
            NEX Events & Capacity Building
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Attend interdisciplinary masterclasses, research symposia, and discover the practical innovations produced by our student cohorts.
          </p>
        </div>

        {/* Interactive Stacking Navigation Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {EVENTS_DATA.map((ev, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={ev.id}
                onClick={() => handleSelectIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2FA137] text-white shadow-md'
                    : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:text-[#060721] dark:hover:text-white border border-slate-200 dark:border-neutral-800'
                }`}
              >
                <span>{`0${idx + 1}. `}</span>
                <span>{ev.isCohort ? 'R&D Cohort Showcase' : ev.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* ─── CARD STACK AREA ─── */}
        <div 
          ref={containerRef}
          className="relative max-w-3xl mx-auto pt-4 pb-8"
        >
          {/* Card Stack Wrapper */}
          <div className="relative w-full min-h-[580px] sm:min-h-[540px]">
            {/* THIRD CARD IN STACK (Backdrop depth) */}
            {thirdEvent && (
              <div 
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl bg-slate-200/70 dark:bg-neutral-900/60 border border-slate-300/60 dark:border-neutral-800 pointer-events-none transition-all duration-500 ease-out"
                style={{
                  transform: 'translate(20px, 18px) rotate(2deg) scale(0.94)',
                  zIndex: 10
                }}
              />
            )}

            {/* SECOND CARD IN STACK (TILTED TO THE RIGHT - CLICK OR HOVER TO SHUFFLE) */}
            {nextEvent && (
              <div
                onClick={handleNext}
                onMouseEnter={handleBehindMouseEnter}
                onMouseLeave={handleBehindMouseLeave}
                title="Click to shuffle this event to the front"
                className="group absolute inset-0 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-xl cursor-pointer transition-all duration-400 ease-out overflow-hidden hover:rotate-[6.5deg] hover:translate-x-8 sm:hover:translate-x-12"
                style={{
                  transform: isShuffling 
                    ? 'translate(0px, 0px) rotate(0deg) scale(1)' 
                    : 'translate(24px, 12px) rotate(4.5deg) scale(0.97)',
                  zIndex: isShuffling ? 30 : 20
                }}
              >
                {/* Visual Peeking Details Banner on the Right */}
                <div className="absolute top-0 right-0 w-36 sm:w-48 h-full bg-linear-to-l from-emerald-50/80 dark:from-neutral-800/80 to-transparent pointer-events-none" />

                <div className="p-6 sm:p-8 space-y-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  {/* Peeking Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#2FA137]">
                      {nextEvent.category}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#2FA137] bg-emerald-500/10 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                      Next in Queue ↗
                    </span>
                  </div>

                  {/* Thumbnail peek */}
                  {nextEvent.images && nextEvent.images.length > 0 && (
                    <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-800">
                      <img 
                        src={nextEvent.images[0]} 
                        alt={nextEvent.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <h3 className="text-lg sm:text-xl font-black text-[#060721] dark:text-white leading-snug line-clamp-2">
                    {nextEvent.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {nextEvent.preview}
                  </p>
                </div>
              </div>
            )}

            {/* ACTIVE FRONT CARD (Top of the Stack) */}
            <div
              className={`relative rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-5 transition-all duration-300 ease-out ${
                isShuffling ? '-translate-x-12 -rotate-6 opacity-0 scale-95' : 'translate-x-0 rotate-0 opacity-100 scale-100'
              }`}
              style={{ zIndex: isShuffling ? 10 : 30 }}
            >
              {/* Card Header Row */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#2FA137]">
                  {currentEvent.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-slate-400 dark:text-slate-500">
                    {`0${activeIndex + 1} / 0${totalEvents}`}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-500 hover:text-[#2FA137] transition-colors"
                    title="Shuffle to next event"
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Event Image / Slider */}
              {currentEvent.images && currentEvent.images.length > 0 && (
                <ImageSlider images={currentEvent.images} title={currentEvent.title} />
              )}

              {/* Title & Preview */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#060721] dark:text-white leading-tight">
                  {currentEvent.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed italic">
                  "{currentEvent.preview}"
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                  {currentEvent.description}
                </p>
              </div>

              {/* Speaker & Date Row */}
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 dark:border-neutral-800 text-xs text-slate-600 dark:text-slate-400">
                {currentEvent.speaker && (
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                    <UserCheck className="w-4 h-4 text-[#2FA137] shrink-0" />
                    <span>{currentEvent.speaker}</span>
                  </div>
                )}
                {currentEvent.date && (
                  <div className="flex items-center gap-1.5 font-normal">
                    <Calendar className="w-4 h-4 text-[#2FA137] shrink-0" />
                    <span>{currentEvent.date}</span>
                  </div>
                )}
                {currentEvent.location && (
                  <div className="flex items-center gap-1.5 font-normal">
                    <MapPin className="w-4 h-4 text-[#2FA137] shrink-0" />
                    <span className="truncate">{currentEvent.location}</span>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Read More button */}
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(currentEvent)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-[#060721] dark:text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 text-[#2FA137]" />
                  </button>

                  {/* Cohort Direct Action */}
                  {currentEvent.isCohort && (
                    <button
                      type="button"
                      onClick={() => setIsCohortModalOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      <span>View Cohort Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* Webinar Watch Action */}
                  {currentEvent.watchLink && (
                    <a
                      href={currentEvent.watchLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                    >
                      <Play className="w-4 h-4" />
                      <span>Watch Webinar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Shuffle Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-2.5 rounded-full border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 transition-colors"
                    aria-label="Previous Card"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-[#2FA137] hover:bg-[#26892c] text-white shadow-md transition-all flex items-center gap-1.5 px-4 text-xs font-bold"
                    aria-label="Shuffle to Next Card"
                  >
                    <span>Shuffle</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Shuffle Hint */}
          <div className="text-center pt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2FA137] animate-pulse" />
              <span>Click the tilted card on the right, or use the controls and tabs above to explore events.</span>
            </p>
          </div>
        </div>

        {/* Highlighted Cohort Showcase Bottom Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#060721] dark:bg-neutral-900 text-white border border-slate-800 dark:border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#2FA137]">
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
            type="button"
            onClick={() => setIsCohortModalOpen(true)}
            className="relative z-10 shrink-0 flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-black text-xs sm:text-sm shadow-xl hover:scale-[1.03] transition-all"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>View Cohort Projects</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Cohort Projects Modal */}
      <CohortProjectsModal
        isOpen={isCohortModalOpen}
        onClose={() => setIsCohortModalOpen(false)}
      />

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onOpenCohortModal={() => setIsCohortModalOpen(true)}
        />
      )}
    </section>
  );
};
