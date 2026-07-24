import React, { useState } from 'react';
import { GlassCard } from '../UI/GlassCard';
import { FileText, Clock, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const PublicationsArchive = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section id="publications" className="pt-4 pb-12 sm:pt-6 sm:pb-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60">
            <Clock className="w-3.5 h-3.5 text-[#2FA137]" />
            <span>INCOMING PUBLICATIONS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#060721] mt-1">
            Publications & Annual Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            NEX's open-access research papers, technical blueprints, and annual societal impact reports will be published here upon completion of the 2026 First Cycle.
          </p>
        </div>

        {/* Incoming Banner */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#e6f6e8] text-[#2FA137] font-bold flex items-center justify-center mx-auto shadow-xs">
              <FileText className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#060721]">
                First Annual Report Release Scheduled for Q4 2026
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 font-medium">
                Subscribe to receive immediate notification when our interdisciplinary research papers and open hardware blueprints are released.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2FA137]" />
                <span>Subscribed! You will be notified on official PDF publication releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate or student email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
