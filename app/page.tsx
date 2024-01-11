import { GoPasskeyFill } from 'react-icons/go';
import { Podkova } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';

const font = Podkova({
  subsets: ['cyrillic-ext'],
  weight: ['400', '700'],
});

export default function Home() {
  console.log('Home');

  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 to-green-400">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md flex items-stretch justify-between',
            font.className
          )}
        >
          <GoPasskeyFill className="text-purple-500 mr-6" /> Authentication and
          Authorization
        </h1>
        <p className="text-white text-lg">The Auth System</p>
        <div>
          <LoginButton>
            <Button variant={'secondary'} size="lg">
              Log In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
