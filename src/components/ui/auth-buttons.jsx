import { Button } from '@/components/ui/button';
import { signIn, signOut } from 'next-auth/react';

export function SignInWithDiscogs() {
  return (
    <Button
      variant="outline"
      onClick={() => signIn('discogs')}
      className="hover:bg-stone-950 hover:text-white hover:dark:bg-stone-50 hover:dark:text-black"
    >
      <span>Sign in with Discogs</span>
    </Button>
  );
}

export function SignOut() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut()}
      className="hover:bg-stone-950 hover:text-white hover:dark:bg-stone-50 hover:dark:text-black"
    >
      <span>Sign out</span>
    </Button>
  );
}
