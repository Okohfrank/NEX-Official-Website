import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../UI/StatCard';
import { ArrowRight, Users, Hammer, Award, CheckCircle2, Play } from 'lucide-react';

export const Hero = () => {
  const { setActiveTab, cycle } = useApp();

  return (
    <section id="hero" className="relative bg-white pt-2 pb-0 overflow-hidden">
      {/* Full-bleed Right Hero Image touching screen edge */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[48%] z-0 pointer-events-none">
        <div className="relative w-full h-full">
          <img 
            src="/hero.png" 
            alt="NEX Engineering Students Collaborating" 
            className="w-full h-full object-cover object-center"
          />
          {/* Narrow Subtle Gradient Fade to White on left edge */}
          <div className="absolute top-0 bottom-0 left-0 w-24 xl:w-36 bg-gradient-to-r from-white via-white/50 to-transparent z-10"></div>
          {/* Smooth bottom blend fading to pure white at bottom of hero section */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16 relative z-10 space-y-6 sm:space-y-8">
        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Pitch & CTAs */}
          <div className="lg:col-span-7 space-y-6 pt-6 sm:pt-10 lg:pt-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e6f6e8] text-[#060721] text-xs font-bold tracking-wider">
              <span>INNOVATE • COLLABORATE • </span>
              <span className="text-[#2FA137]">IMPACT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#060721] tracking-tight leading-[1.15]">
              Engineering Solutions.<br />
              <span className="text-[#2FA137]">Transforming Society.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-xl">
              NEX brings together the brightest minds in Engineering, Agriculture, and Environmental Sciences to research, innovate, and build real solutions to real-world problems.
            </p>

            <div className="flex flex-row items-center gap-2.5 sm:gap-4 pt-1">
              <button
                onClick={() => setActiveTab('register')}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs sm:text-sm px-4 sm:px-6 h-11 sm:h-12 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] shrink-0"
              >
                <span>Submit a Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={() => setActiveTab('showcase')}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white border border-slate-200 text-[#060721] font-bold text-xs sm:text-sm px-4 sm:px-6 h-11 sm:h-12 rounded-xl hover:bg-slate-50 transition-all shadow-xs shrink-0"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#060721] fill-[#060721] ml-0.5" />
                </div>
                <span>Watch Intro</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2 shrink-0">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
              </div>
              <p className="text-xs text-slate-600 font-medium leading-tight max-w-md">
                Join <strong className="text-[#060721] font-bold">500+</strong> Lagos State University Engineering, Agriculture & Environmental Sciences students already building the future
              </p>
            </div>
          </div>

          {/* Mobile Image View */}
          <div className="lg:hidden relative flex justify-center">
            <div className="relative w-full max-w-md aspect-video sm:aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img 
                src="/hero.png" 
                alt="NEX Engineering Students Collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <StatCard label="Verified Members" value={cycle.totalMembers} subtext="Across 3 Faculties" icon={Users} />
          <StatCard label="Active Groups" value={cycle.activeGroups} subtext="2026 First Cycle" icon={Hammer} />
          <StatCard label="Selected Projects" value={cycle.selectedProjectsCount} subtext="Build Pipeline" icon={Award} />
          <StatCard label="Missions Completed" value="18" subtext="Open Research Data" icon={CheckCircle2} />
        </div>
      </div>
    </section>
  );
};
