import React from 'react';
import { CardWrapper } from './card-wrapper';

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome you come back!"
      backButtonLabel="You have not yet registered?"
      backButtonHref="/auth/register"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
};
