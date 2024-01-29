'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { CardWrapper } from './card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import { FormErrors } from './form-errors';
import { FormSuccess } from './form-success';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handelSubmit = useCallback(() => {
    console.log('submit token: ', token);

    if (success || error) {
      return;
    }
    if (!token) {
      setError('Invalid token');
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((err) => {
        setError('verify email token failed, form');
      });
  }, [token, success, error]);

  useEffect(() => {
    handelSubmit();
  }, [handelSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color="#0d740d" />}

        <FormSuccess message={success} />
        {!success && <FormErrors message={error} />}
      </div>
    </CardWrapper>
  );
};
