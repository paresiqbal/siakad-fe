import { createContext, ReactNode, useState, useEffect } from "react";

// Update the context type to include token and setToken
interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
}

interface User {
  id: number;
  username: string;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: AppProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from state
            Accept: "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          console.log(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }

    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AppContext.Provider value={{ token, setToken, user }}>
      {children}
    </AppContext.Provider>
  );
}
