'use client';
export default function Footer({ session }) {
  return (
    <footer className="m-4 rounded-lg shadow-sm">
      <span className="block text-sm text-gray-500 sm:text-center">
        {session ? `Signed in as ${session?.user?.name}` : 'Not signed in.'}
      </span>
    </footer>
  );
}
