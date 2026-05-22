import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  const variants = {
    default: 'bg-white/95 border border-slate-200/80 text-slate-900 dark:bg-slate-900/95 dark:border-slate-700/80 dark:text-slate-100',
    elevated: 'bg-white/95 shadow-2xl shadow-slate-950/10 border border-slate-200/80 dark:bg-slate-900/95 dark:border-slate-700/80',
    outlined: 'bg-transparent border-2 border-slate-200/70 text-slate-900 dark:border-slate-700/70 dark:text-slate-100',
  };

  return <div className={cn(variants[variant], 'rounded-3xl p-6', className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('pb-4 border-b border-slate-200/70 mb-4 dark:border-slate-700/80', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-2xl font-semibold text-slate-900 dark:text-slate-100', className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-slate-600 dark:text-slate-400 mt-2', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('pt-4 border-t border-slate-200/70 mt-6 flex flex-wrap gap-3 dark:border-slate-700/80', className)} {...props} />;
}
