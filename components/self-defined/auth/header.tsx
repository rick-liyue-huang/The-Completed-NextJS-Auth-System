import React from 'react';
import { Podkova } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Podkova({
  subsets: ['cyrillic-ext'],
  weight: ['500', '600', '800'],
});

interface Props {
  label: string;
}

export const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn('text-3xl font-semibold text-green-600', font.className)}
      >
        Auth - Login
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
