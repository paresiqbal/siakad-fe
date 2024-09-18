"use client";

import { useContext } from "react";
import { signOut } from "next-auth/react";
import { AppContext } from "@/context/AppContext";

export default function Dashboard() {
  const { user }: any = useContext(AppContext);

  return (
    <div>
      <div>{user ? <div>{user.username}</div> : <div>Loading...</div>}</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
