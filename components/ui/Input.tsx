import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-slate-200 mb-2">{label}</label>}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30',
            error && 'border-rose-500 text-rose-100 focus:ring-rose-400/40',
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
