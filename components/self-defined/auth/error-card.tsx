import React from 'react';
import { Header } from './header';
import { BackButton } from './back-button';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { CardWrapper } from './card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oh, Something wrong, try again"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className=" text-destructive text-6xl" />
      </div>
    </CardWrapper>
  );
};
