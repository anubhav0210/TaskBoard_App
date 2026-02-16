// Board.jsx
// Main task board layout

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import ActivityLog from "../components/ActivityLog";

function Board() {
  const { logout } = useAuth();
  const { resetBoard } = useTasks();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2>Task Board</h2>

      <button onClick={logout}>Logout</button>
      <button onClick={() => setShowForm(true)}>Add Task</button>
      <button onClick={resetBoard}>Reset Board</button>

      {showForm && <TaskForm closeForm={() => setShowForm(false)} />}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Column status="Todo" />
        <Column status="Doing" />
        <Column status="Done" />
      </div>

      <ActivityLog />
    </div>
  );
}

export default Board;
