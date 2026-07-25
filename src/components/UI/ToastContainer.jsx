import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X, ShieldAlert, Sparkles } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-[100] space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isError = t.type === 'error';
        const isWarning = t.type === 'warning';

        return (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border transition-all animate-in slide-in-from-top-4 fade-in duration-300 flex items-start gap-3 ${
              isSuccess
                ? 'bg-[#060721] text-white border-emerald-500/40 shadow-emerald-950/40'
                : isError
                ? 'bg-red-950 text-white border-red-500/40 shadow-red-950/40'
                : isWarning
                ? 'bg-amber-950 text-white border-amber-500/40 shadow-amber-950/40'
                : 'bg-[#060721] text-white border-slate-700 shadow-slate-950/40'
            }`}
          >
            {/* Icon */}
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#2FA137]" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
              {isWarning && <ShieldAlert className="w-5 h-5 text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Sparkles className="w-5 h-5 text-[#2FA137]" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {t.title && (
                <h4 className="font-extrabold text-xs text-white mb-0.5 tracking-wide">{t.title}</h4>
              )}
              <p className="text-xs text-slate-300 font-medium leading-snug">{t.message}</p>
            </div>

            {/* Close button */}
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
