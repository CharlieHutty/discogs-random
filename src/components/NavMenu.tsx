"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import ClientFetch from "./ClientFetch";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        <div className="overflow-auto h-[500px] w-[500px]"><ClientFetch /></div>
      </>
    );
  }
  return (
    <>
        <button onClick={() => signIn()}>Sign in</button>
    </>
  ) 
}

export default function NavMenu() {
  return (
    <div>
        <AuthButton />
    </div>
  );
}