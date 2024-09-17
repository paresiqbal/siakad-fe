import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export default function AppProvider({ children }: any) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);

  async function getUser() {
    const res = await fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUser(data);
  }

  useEffect(() => {
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
