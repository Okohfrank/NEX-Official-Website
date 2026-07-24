import React, { useEffect, useState } from 'react';

export const StatCard = ({ label, value, subtext, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    let start = 0;
    const duration = 800;
    const increment = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  const displayVal = isNaN(parseInt(value, 10)) ? value : count;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#2FA137] mb-1">
          {label}
        </p>
        <h3 className="text-2xl sm:text-3xl font-black text-[#060721] tracking-tight">
          {displayVal}
        </h3>
        {subtext && (
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            {subtext}
          </p>
        )}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-emerald-50 text-[#2FA137] shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
