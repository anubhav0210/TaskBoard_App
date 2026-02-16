// TaskCard.jsx
// Displays single task card

import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "./TaskForm";

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const [editing, setEditing] = useState(false);

  return (
    <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
      {editing ? (
        <TaskForm existingTask={task} closeForm={() => setEditing(false)} />
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Due: {task.dueDate || "No due date"}</p>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TaskCard;
