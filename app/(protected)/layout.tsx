import React from 'react';
import { Navbar } from '../../components/self-defined/auth/navbar';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-6 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-yellow-400">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
