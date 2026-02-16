// Column.jsx
// Column acts as a drop zone

import { useDroppable } from "@dnd-kit/core";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function Column({ status, search, filterPriority, sortOrder }) {
  const { tasks } = useTasks();

  // Make column droppable
  const { setNodeRef } = useDroppable({
    id: status, // Unique ID for column
  });

  // Filter tasks by column
  let filteredTasks = tasks.filter((task) => task.status === status);

  // SEARCH
  if (search) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // FILTER BY PRIORITY
  if (filterPriority !== "All") {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === filterPriority
    );
  }

  // SORT BY DUE DATE
  if (sortOrder) {
    filteredTasks.sort((a, b) => {
      if (!a.dueDate) return 1; // empty last
      if (!b.dueDate) return -1;

      return sortOrder === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    });
  }

  return (
    <div ref={setNodeRef} className="column">

      <h3>{status}</h3>

      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;
