import { createContext, useContext, useState, useEffect } from "react";

const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  function login(user) {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
