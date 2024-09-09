import { createContext, ReactNode } from "react";

interface AppContextType {
  name: string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <AppContext.Provider value={{ name: "pares" }}>
      {children}
    </AppContext.Provider>
  );
}
