import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-slate-200 mb-2">{label}</label>}
        <select
          ref={ref}
          className={cn(
            'w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-slate-100 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30',
            error && 'border-rose-500 focus:ring-rose-400/40',
            className
          )}
          {...props}
        >
          <option value="" className="text-slate-900">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
