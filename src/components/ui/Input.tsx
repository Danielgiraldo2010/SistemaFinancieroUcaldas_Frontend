import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Instala lucide-react

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-gray-700 ml-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full px-4 py-3 rounded-xl border transition-all outline-none
            ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-200 focus:border-ucaldas-blue focus:ring-1 focus:ring-ucaldas-blue"}
            bg-white text-gray-800 placeholder:text-gray-400`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ucaldas-blue"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium ml-1">{error}</span>
      )}
    </div>
  );
};
