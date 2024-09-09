import { createContext, ReactNode, useState, useEffect } from "react";

// Update the context type to include token and setToken
interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: AppProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: "", // Use the token for authorization
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json(); // Await the response before parsing
        setUser(data); // Set the user data
        console.log(data); // Debug user data
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  // Use useEffect to safely access localStorage on the client side
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsMounted(true); // Indicate that the component is now mounted
  }, []); // Run once on component mount

  if (!isMounted) {
    // During SSR and before the component mounts on the client, return null or a loader
    return null;
  }

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}
