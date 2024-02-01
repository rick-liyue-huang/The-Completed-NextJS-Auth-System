'use client';

import { useCurrentRole } from '@/hooks';
import React from 'react';
// import { auth } from '@/auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RoleEntry } from '@/components/self-defined/auth/role-entry';
import { FormSuccess } from '@/components/self-defined/auth/form-success';
import { UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { admin } from '@/actions/admin';

const AdminPage = () => {
  const role = useCurrentRole();

  // const session = await auth();
  // const role = session?.user?.role;

  const handleServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  const handleApiRouteClick = async () => {
    fetch('/api/admin').then((res) => {
      if (res.ok) {
        // console.log('admin success');
        toast.success('admin success');
      } else {
        toast.error('admin fail');
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-serif text-center">⌨️ Admin</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <RoleEntry allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You have the permission to visit here, Welcome" />
        </RoleEntry>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin only - API Route</p>
          <Button variant={'secondary'} onClick={handleApiRouteClick}>
            Click to Test
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin only - Server Action</p>
          <Button variant={'secondary'} onClick={handleServerActionClick}>
            Click to Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;

/**
 * if is server page
 * import { auth } from '@/auth';
 *
 * const session = await auth();
 *
 * return session?.user?.role
 */

/**
 * if is client page
 * import { useCurrentUser } from '@/hooks';
 * const user = useCurrentUser();
 * return user?.role
 */
