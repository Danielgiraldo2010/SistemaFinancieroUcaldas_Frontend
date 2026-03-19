import { ReactNode } from "react";

interface AuthCardProps {
  readonly children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-sm bg-white/95 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col">
      {children}
    </div>
  );
}
