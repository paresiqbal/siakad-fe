"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AppContext } from "@/context/AppContext";

export default function Dashboard() {
  const { user }: any = useContext(AppContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [router, status]);

  return (
    <div>
      <div>{user ? <div>{user.username}</div> : <div>Loading...</div>}</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
