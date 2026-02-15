import { createContext, useContext,useEffect,useState} from "react";

const AuthContext = createContext();

// Custom hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Check if user already saved in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

}