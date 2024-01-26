import React from 'react';
import { ErrorCard } from '@/components/self-defined/auth/error-card';

const AuthErrorPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-dark-400">
      <ErrorCard />;
    </div>
  );
};

export default AuthErrorPage;
