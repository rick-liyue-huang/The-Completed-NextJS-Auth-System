import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default AuthLayout;
