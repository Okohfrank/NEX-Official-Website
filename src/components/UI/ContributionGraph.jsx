import React from 'react';

export const ContributionGraph = () => {
  // Generate mock 52 weeks x 7 days heat map data
  const weeks = Array.from({ length: 24 }, (_, wIndex) => {
    return Array.from({ length: 7 }, (_, dIndex) => {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.85) level = 4;
      else if (rand > 0.7) level = 3;
      else if (rand > 0.5) level = 2;
      else if (rand > 0.3) level = 1;
      return { day: dIndex, level };
    });
  });

  const levelColors = {
    0: 'bg-slate-200 dark:bg-slate-800',
    1: 'bg-sky-200 dark:bg-sky-950',
    2: 'bg-sky-400 dark:bg-sky-800',
    3: 'bg-sky-600 dark:bg-sky-600',
    4: 'bg-sky-400 shadow-sm shadow-sky-500/50'
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
            Research & Build Activity Heatmap
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            148 contributions in 2026 First Cycle (Research Log + Build Log posts)
          </p>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-800"></span>
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-300 dark:bg-sky-950"></span>
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 dark:bg-sky-700"></span>
          <span className="w-2.5 h-2.5 rounded-sm bg-sky-400"></span>
          <span>More</span>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1.5 min-w-max">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  className={`w-3 h-3 rounded-sm transition-transform hover:scale-125 cursor-pointer ${levelColors[day.level]}`}
                  title={`Level ${day.level} activity on day ${dIdx + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
