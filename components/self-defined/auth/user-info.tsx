import React from 'react';
import { ExtendedUser } from '@/next-auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  user?: ExtendedUser; // match with the next-auth.d.ts
  label: string;
}

export const UserInfo = ({ user, label }: Props) => {
  return (
    <Card className="w-[600px] shadow-lg">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-md border shadow-sm p-2">
          <p className="text-sm font-medium">ID:</p>
          <p className="truncate text-xs max-w-[160px] font-serif p-1 bg-slate-100">
            {user?.id}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-md border shadow-sm p-2">
          <p className="text-sm font-medium">Name:</p>
          <p className="truncate text-xs max-w-[160px] font-serif p-1 bg-slate-100">
            {user?.name}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-md border shadow-sm p-2">
          <p className="text-sm font-medium">Email:</p>
          <p className="truncate text-xs max-w-[160px] font-serif p-1 bg-slate-100">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-md border shadow-sm p-2">
          <p className="text-sm font-medium">Role:</p>
          <p className="truncate text-xs max-w-[160px] font-serif p-1 bg-slate-100">
            {user?.role}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-md border shadow-sm p-2">
          <p className="text-sm font-medium">Two Factor Auth:</p>
          <p className="truncate text-xs max-w-[160px] font-serif p-1 bg-slate-100">
            <Badge
              variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
            >
              {user?.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
