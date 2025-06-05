import { createContext, useContext, useState, useEffect } from "react";

/* Create context */
const AuthContext = createContext();

/* Auth provider */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const authUser = localStorage.getItem("auth-user");
    return authUser ? JSON.parse(authUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!user);

  // If user exists then set it in localstorage else remove auth-user
  useEffect(() => {
    if (user) {
      localStorage.setItem("auth-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth-user");
    }
  }, [user]);

  // Login method to set user in state (after in localstorage)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout method, remove user from localstorage
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProviderStatus = (userId, status) => {
    if (user && user.id === userId) {
      setUser({ ...user, providerStatus: status });
    }
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProviderStatus }}>{children}</AuthContext.Provider>;
};

/* Hook to use auth state */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);