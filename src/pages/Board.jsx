// Board.jsx
// Main task board layout

import { useAuth } from "../context/AuthContext";

function Board() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Task Board</h2>

      {/* Logout button */}
      <button onClick={logout}>Logout</button>

      {/* Columns will come here next */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div>
          <h3>Todo</h3>
        </div>

        <div>
          <h3>Doing</h3>
        </div>

        <div>
          <h3>Done</h3>
        </div>
      </div>
    </div>
  );
}

export default Board;
