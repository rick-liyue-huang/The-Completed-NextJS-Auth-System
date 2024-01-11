import React from 'react';
import { CardWrapper } from '@/components/auth/CardWrapper';

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Login Page"
      backButtonLabel="Have not yet an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login Form
    </CardWrapper>
  );
};
