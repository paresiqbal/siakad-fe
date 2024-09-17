"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") router.push("/login");
  }, [router, status]);

  return (
    <div>
      Dashboard
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
}
