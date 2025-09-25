import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-72 w-[42rem] -translate-y-1/3 rounded-full bg-brand-500/20 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 pb-12 pt-20 sm:px-10">
        {children}
      </div>
    </div>
  );
}
