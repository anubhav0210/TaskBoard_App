// Column.jsx
// Displays tasks based on status (Todo, Doing, Done)

import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function Column({ status }) {
  const { tasks } = useTasks();

  // Filter tasks based on column
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div style={{ width: "300px", minHeight: "400px", border: "2px solid black", padding: "10px" }}>
      <h3>{status}</h3>

      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;
