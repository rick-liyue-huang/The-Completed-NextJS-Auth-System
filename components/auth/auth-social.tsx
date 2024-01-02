'use client';

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

export const AuthSocial = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant={'outline'}
        onClick={() => {}}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant={'outline'}
        onClick={() => {}}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
    </div>
  );
};