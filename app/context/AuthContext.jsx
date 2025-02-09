"use client";

import { createContext, use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = use(AuthContext);

  if (context === undefined)
    throw new Error("Context was used outside Provider");

  return context;
}

export { AuthContextProvider, useAuth };
