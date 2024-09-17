import { useSession } from "next-auth/react";
import React from "react";

export default function AdminDashboard() {
  // const { data: session, status }: any = useSession();
  // console.log(session);
  // console.log(status);

  return (
    <div className="p-6">
      <main className="hidden flex-grow overflow-auto p-4 md:block">
        <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      </main>
    </div>
  );
}
