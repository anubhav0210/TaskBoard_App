// App.jsx
// This file handles routing of our application

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
// Protected Route Component
// It prevents access to board without login
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // If user not authenticated redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
      </Routes>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
