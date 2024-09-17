"use client";

import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="h-full">{children}</div>
    </div>
  );
}
