import { RegisterForm } from '@/components/auth/RegisterForm';
import React from 'react';

const RegisterPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-300 to-yellow-400">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
