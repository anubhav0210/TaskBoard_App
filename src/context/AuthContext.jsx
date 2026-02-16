import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Custom hook to use auth anywhere
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // check if user already saved in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("auth") === "true"
  );

  
  // Login function
  const login = (email, password, remember) => {
    if (email === "intern@demo.com" && password === "intern123") {
      setIsAuthenticated(true);

      // If remember me checked
      if (remember) {
        localStorage.setItem("auth", "true");
      }

      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };
   return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}