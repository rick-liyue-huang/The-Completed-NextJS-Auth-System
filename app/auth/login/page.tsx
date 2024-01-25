import { LoginForm } from '@/components/self-defined/auth/login-form';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-300 to-orange-400">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
