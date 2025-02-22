import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';

import SessionProvider from '@/components/SessionProvider';
import NavMenu from '@/components/NavMenu';

import { ThemeProvider } from '@/components/theme-provider';

import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Discord Randomiser',
  description: 'Discord wrapper to randomise and mange your audio collection.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <NavMenu />
            <main className="mx-auto flex max-w-5xl gap-2 text-2xl">{children}</main>
            <Footer session={session} />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
