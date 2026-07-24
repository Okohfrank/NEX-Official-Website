import React from 'react';
import { Award, Share2, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CredentialCard = ({
  memberName = "Nkechi Eze",
  roleName = "Environmental Research Specialist",
  topic = "Clean Hydro Bio-Filter Unit for High-Iron Boreholes",
  cycle = "2026 First Cycle",
  issueDate = "July 2026"
}) => {
  const handleShare = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    alert(`LinkedIn Share Link generated for ${memberName}'s Research Contributor Credential!`);
  };

  return (
    <div className="relative rounded-3xl p-5 sm:p-8 bg-black dark:bg-zinc-900 text-white border border-zinc-800 shadow-2xl overflow-hidden max-w-xl mx-auto">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5 mb-5">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl sm:text-2xl text-white tracking-tight">NEX</span>
          <div>
            <h3 className="font-black text-sm sm:text-base text-white tracking-wide">
              OFFICIAL RESEARCH CREDENTIAL
            </h3>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium tracking-wider">
              NETWORK OF ENGINEERING XCELLENCE
            </p>
          </div>
        </div>
        <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white shrink-0" />
      </div>

      {/* Recipient info */}
      <div className="space-y-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">Awarded To</span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {memberName}
          </h2>
          <p className="text-xs text-zinc-300 font-semibold">{roleName}</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900 dark:bg-zinc-800/80 border border-zinc-800">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">Research Topic</span>
          <p className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">{topic}</p>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
            <span>Cycle: <strong className="text-white">{cycle}</strong></span>
            <span>Issued: <strong className="text-white">{issueDate}</strong></span>
          </div>
        </div>
      </div>

      {/* Verification footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-[11px] truncate">#NEX-2026-9821</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-extrabold text-xs shadow-lg hover:opacity-90 transition-all w-full sm:w-auto"
        >
          <Share2 className="w-4 h-4" />
          <span>Share to LinkedIn</span>
        </button>
      </div>
    </div>
  );
};
