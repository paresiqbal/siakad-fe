"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-full">{children}</div>
    </div>
  );
}
