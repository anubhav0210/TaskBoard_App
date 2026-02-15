import { createContext, useContext,useEffect,useState} from "react";

const AuthContext = createContext();

// Custom hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // check if user already saved in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  
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