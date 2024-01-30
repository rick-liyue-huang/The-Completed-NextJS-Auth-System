import React from 'react';
import { ResetForm } from '@/components/self-defined/auth/reset-form';

const ResetPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200 to-blue-500">
      <ResetForm />
    </div>
  );
};

export default ResetPage;
