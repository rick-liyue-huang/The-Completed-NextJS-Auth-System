import { RegisterForm } from '@/components/auth/register-form';
import React from 'react';

const RegisterPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 to-sky-300">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
