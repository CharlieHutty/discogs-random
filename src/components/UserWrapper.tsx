"use client";
import { useSession } from "next-auth/react";

function Show() {
    const { data: session } = useSession();
    
    return (
        <div>
        {session ? (
            <div>
                <p>Signed in as {session?.user?.name}</p>
            </div>
        ) : (
            <div>
                <p>Not signed in</p>
            </div>
        )}
        </div>
        
    );
}

export default function UserWrapper() {
    return (
      <div>
          <Show />
      </div>
    );
  }