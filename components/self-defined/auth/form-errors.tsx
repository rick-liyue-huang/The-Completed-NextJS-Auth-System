import React from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface Props {
  message?: string;
}

export const FormErrors = ({ message }: Props) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="w-6 h-6" />
      <p>{message}</p>
    </div>
  );
};
