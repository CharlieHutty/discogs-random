'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/theme-toggle';
import { SignInWithDiscogs, SignOut } from '@/components/ui/auth-buttons';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <SignOut />
      </>
    );
  }
  return (
    <>
      <SignInWithDiscogs />
    </>
  );
}

export default function NavMenu() {
  return (
    <div>
      <nav className="flex items-center justify-between border-b p-4">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <Link href="/" className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/collection"
                className="text-lg font-medium text-gray-900 dark:text-gray-100"
              >
                Collection
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <AuthButton />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
