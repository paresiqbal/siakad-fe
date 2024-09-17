import { createContext, useEffect, useState } from "react";

// Create the context
export const AppContext = createContext({});

// Create the provider component
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Move getUser function inside the useEffect
    async function getUser() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user }}>
      {children}
    </AppContext.Provider>
  );
}
