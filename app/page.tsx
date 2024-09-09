"use client";

import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function Home() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { name } = context;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World! {name}</h1>
    </main>
  );
}
