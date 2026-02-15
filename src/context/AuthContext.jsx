import { createContext, useContext} from "react";

const AuthContext = createContext();

// Custom hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext);
}