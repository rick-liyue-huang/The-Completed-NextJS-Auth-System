import React from 'react';
import { RegisterForm } from '@/components/self-defined/auth/register-form';

const LoginPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200 to-pink-500">
      <RegisterForm />
    </div>
  );
};

export default LoginPage;
