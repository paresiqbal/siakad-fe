import { createContext, ReactNode, useState } from "react";

interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: AppProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}
