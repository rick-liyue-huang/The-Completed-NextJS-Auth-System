import React from 'react';
import { cn } from '@/lib/utils';
import { Podkova } from 'next/font/google';

const font = Podkova({
  subsets: ['cyrillic-ext'],
  weight: ['400', '700'],
});

interface AuthHeaderProps {
  label: string;
}

export const AuthHeader = ({ label }: AuthHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn('text-3xl font-semibold', font.className)}>
        Authentication
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
