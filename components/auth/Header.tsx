import React from 'react';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '700'],
});

interface HeaderProps {
  label?: string;
}
export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn('text-ellipsis font-semibold', font.className)}>
        Auth
      </h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
