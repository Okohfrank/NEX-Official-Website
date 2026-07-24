import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-zinc-100 text-zinc-900 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700',
    black: 'bg-black text-white dark:bg-white dark:text-black border-transparent font-bold',
    green: 'bg-zinc-200 text-zinc-900 border-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 font-bold',
    amber: 'bg-zinc-200 text-zinc-800 border-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 font-medium'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
};
