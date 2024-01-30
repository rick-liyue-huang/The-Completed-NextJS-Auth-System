import React from 'react';
import { NewVerificationForm } from '@/components/self-defined/auth/new-verification-form';

const NewVerificationPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-200 to-orange-300">
      <NewVerificationForm />
    </div>
  );
};

export default NewVerificationPage;
