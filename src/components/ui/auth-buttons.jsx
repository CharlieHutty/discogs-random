import { Button } from '@/components/ui/button';
import { signIn, signOut } from 'next-auth/react';

export function SignInWithDiscogs() {
  return (
    <Button
      variant="outline"
      onClick={() => signIn('discogs')}
      className="flex items-center space-x-2"
    >
      <span>Sign in with Discogs</span>
    </Button>
  );
}

export function SignOut() {
  return (
    <Button variant="outline" onClick={() => signOut()} className="flex items-center space-x-2">
      <span>Sign out</span>
    </Button>
  );
}
