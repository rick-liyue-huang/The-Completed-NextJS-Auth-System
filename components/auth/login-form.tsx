import React from 'react';
import { LoginCardWrapper } from '@/components/auth/login-card-wrapper';

export const LoginForm = () => {
  return (
    <LoginCardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Do not have an Account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login Form
    </LoginCardWrapper>
  );
};
