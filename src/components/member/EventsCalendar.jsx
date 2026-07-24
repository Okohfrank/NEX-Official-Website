import React from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Calendar, MapPin, UserCheck, CheckCircle2 } from 'lucide-react';

export const EventsCalendar = () => {
  const { events, rsvpEvent } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-sky-500/30">
        <Badge variant="purple">EVENTS & WORKSHOPS CALENDAR</Badge>
        <h1 className="text-2xl font-extrabold font-display mt-1">Upcoming NEX Capacity Building Sessions</h1>
        <p className="text-xs text-slate-300">Hands-on workshops in AI, embedded IoT, CAD modeling, research methods, and prototype hackathons.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(ev => (
          <GlassCard key={ev.id} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="sky">{ev.category}</Badge>
                <span className="text-xs text-amber-500 font-bold">{ev.rsvps} Members RSVPed</span>
              </div>

              <h3 className="font-bold text-lg font-display text-slate-900 dark:text-white">{ev.title}</h3>

              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-500" />
                  <span>{ev.date}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <span>{ev.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sky-500" />
                  <span>Speaker/Facilitator: {ev.speaker}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => rsvpEvent(ev.id)}
                disabled={ev.userRsvped}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  ev.userRsvped
                    ? 'bg-emerald-500/20 text-emerald-500 cursor-default flex items-center gap-1.5'
                    : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20'
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
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
