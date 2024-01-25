import React from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';

interface Props {
  message?: string;
}

export const FormSuccess = ({ message }: Props) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-green-300/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-500">
      <CheckCircledIcon className="w-6 h-6" />
      <p>{message}</p>
    </div>
  );
};
