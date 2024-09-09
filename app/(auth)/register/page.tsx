"use client";

import { useState } from "react";

// interface
interface FormData {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<Errors>({});

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
      console.log(data);
    }
  }

  return (
    <div>
      <h1>Register Account</h1>
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
