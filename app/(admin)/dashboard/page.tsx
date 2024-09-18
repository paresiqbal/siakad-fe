"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function Dashboard() {
  const { user }: any = useContext(AppContext);

  return (
    <div>
      <h1>
        Wellcome back
        {user ? <div>{user.username}</div> : <div>Loading...</div>}
      </h1>
    </div>
  );
}
