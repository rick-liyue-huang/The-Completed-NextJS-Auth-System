import { GoPasskeyFill } from 'react-icons/go';
import { Podkova } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/self-defined/auth/login-button';

const font = Podkova({
  subsets: ['cyrillic-ext'],
  weight: ['500', '600', '800'],
});

export default function Home() {
  console.log('Home');

  return (
    <main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 to-green-400">
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
          <LoginButton /* mode={'modal'}*/ asChild>
            <Button variant={'secondary'} size="lg">
              Login
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
