import React from "react";

interface SelectOption {
  readonly label: string;
  readonly value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  readonly label?: string;
  readonly options: SelectOption[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#1d5d8f] focus:ring-1 focus:ring-[#1d5d8f] ${className ?? ""}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
