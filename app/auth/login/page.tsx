import { LoginForm } from '@/components/auth/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300 to-gray-50-50-400">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
