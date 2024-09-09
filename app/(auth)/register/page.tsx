"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";

// Interfaces
interface FormData {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
}

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<Errors>({});

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  // Access AppContext
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { token, setToken } = context;

  // Handle registration
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setError(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      // router.push("/");

      console.log(data);
    }
  }

  return (
    <div>
      <h1>Register Account {token}</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="text-black"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {error.username && <p className="text-white">{error.username}</p>}

        <input
          type="password"
          placeholder="Password"
          className="text-black"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {error.password && <p className="text-white">{error.password}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
