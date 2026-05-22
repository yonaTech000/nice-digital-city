import React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
}

export function Alert({ className, variant = 'info', ...props }: AlertProps) {
  const variants = {
    info: 'bg-sky-50 border border-sky-200 text-sky-900 dark:bg-slate-900 dark:border-slate-700 dark:text-sky-200',
    success: 'bg-emerald-50 border border-emerald-200 text-emerald-900 dark:bg-slate-900 dark:border-slate-700 dark:text-emerald-200',
    warning: 'bg-amber-50 border border-amber-200 text-amber-900 dark:bg-slate-900 dark:border-slate-700 dark:text-amber-200',
    error: 'bg-rose-50 border border-rose-200 text-rose-900 dark:bg-slate-900 dark:border-slate-700 dark:text-rose-200',
  };

  return (
    <div
      role="alert"
      className={cn('rounded-3xl p-4 text-sm leading-6', variants[variant], className)}
      {...props}
    />
  );
}

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: string }) {
  const variants: Record<string, string> = {
    default: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
    primary: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    error: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200',
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
    cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}
