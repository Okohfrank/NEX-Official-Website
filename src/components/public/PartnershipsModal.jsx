import React, { useState } from 'react';
import { GlassCard } from '../UI/GlassCard';
import { Building2, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const PartnershipsModal = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="partnerships" className="pt-4 pb-12 sm:pt-6 sm:pb-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2FA137]">
            INDUSTRY & RESEARCH COLLABORATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#060721] mt-1">
            Partner With NEX
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Sponsor semester missions, provide industrial mentorship, setting real-world challenge problems, or fund student prototype build grants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Partner Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4">
              <h3 className="text-xl font-black text-[#060721]">
                Why Industry Leaders Partner With NEX
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#2FA137] shrink-0 border border-emerald-200/60 shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#060721] text-sm">Direct Access to Top Student Engineering Talent</h4>
                    <p className="text-slate-600 mt-0.5 font-medium leading-relaxed">Recruit vetted students proven across rigorous multidisciplinary design cycles.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#2FA137] shrink-0 border border-emerald-200/60 shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#060721] text-sm">Custom Industry-Set Hackathons & Missions</h4>
                    <p className="text-slate-600 mt-0.5 font-medium leading-relaxed">Submit your corporate R&D challenges for student teams to research and build.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#2FA137] shrink-0 border border-emerald-200/60 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#060721] text-sm">Transparent ESG & Community Impact Reports</h4>
                    <p className="text-slate-600 mt-0.5 font-medium leading-relaxed">Fund verifiable local water, solar energy, and sustainable waste infrastructure projects.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#2FA137] mx-auto animate-bounce" />
                  <h3 className="text-xl font-black text-[#060721]">Inquiry Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                    Thank you. Our <strong>External Relations & Partnership Lead</strong> will review your message and reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h3 className="text-lg font-black text-[#060721] mb-2">
                    Partnership Inquiry Form
                  </h3>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Charles Nwankwo"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700">Organization / Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TotalEnergies / Chevron / UNDP"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="charles@organization.org"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700">Partnership Intent / Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe sponsorship interest, prototype funding, or hackathon collaboration details..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit Partnership Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
