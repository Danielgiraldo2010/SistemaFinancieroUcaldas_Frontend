import React, { ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Instala lucide-react

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
}

export const Input = ({
  label,
  error,
  type,
  leftIcon,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          {...props}
          type={inputType}
          className={`w-full px-4 py-3 rounded-xl border transition-all outline-none
            ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-200 focus:border-ucaldas-blue focus:ring-1 focus:ring-ucaldas-blue"}
            ${leftIcon ? "pl-10" : "pl-4"}
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
