import { createContext, ReactNode, useState, useEffect } from "react";

// Update the context type to include token and setToken
interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

// Create the context with the updated type
export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: AppProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

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
