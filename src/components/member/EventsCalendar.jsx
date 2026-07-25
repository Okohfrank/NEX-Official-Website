import React from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Calendar, MapPin, UserCheck, CheckCircle2 } from 'lucide-react';

export const EventsCalendar = () => {
  const { events, rsvpEvent } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner - Dark Background / White Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl">
        <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full">
          EVENTS & WORKSHOPS CALENDAR
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">Upcoming NEX Capacity Building Sessions</h1>
        <p className="text-xs text-slate-300 mt-1 font-medium">Hands-on workshops in AI, embedded IoT, CAD modeling, research methods, and prototype hackathons.</p>
      </div>

      {/* Events Grid - White Background / Black Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(ev => (
          <div key={ev.id} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-extrabold uppercase">
                  {ev.category}
                </span>
                <span className="text-xs text-[#060721] bg-slate-100 px-2.5 py-0.5 rounded-full font-bold">{ev.rsvps} Members RSVPed</span>
              </div>

              <h3 className="font-black text-lg text-[#060721]">{ev.title}</h3>

              <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2FA137]" />
                  <span>{ev.date}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2FA137]" />
                  <span>{ev.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#2FA137]" />
                  <span>Speaker / Facilitator: {ev.speaker}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => rsvpEvent(ev.id)}
                disabled={ev.userRsvped}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  ev.userRsvped
                    ? 'bg-emerald-50 text-[#2FA137] border border-emerald-200 cursor-default flex items-center gap-1.5'
                    : 'bg-[#2FA137] hover:bg-[#26892c] text-white shadow-md shadow-emerald-600/20'
                }`}
              >
                {ev.userRsvped ? (
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
        ))}
      </div>
    </div>
  );
};
