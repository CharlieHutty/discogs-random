"use client";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        <CollectionButton />
      </>
    );
  }
  return (
    <>
        <button onClick={() => signIn()}>Sign in</button>
    </>
  ) 
}

function CollectionButton() {
  function viewCollection(): void {
    window.location.href = "/api/collection";
  }

  return (
    <button onClick={() => viewCollection()}>Collection</button>
  );
}

export default function NavMenu() {
  return (
    <div>
        <AuthButton />
    </div>
  );
}