// Board.jsx
// Main task board layout

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import Column from "../components/Column";
import { DndContext } from "@dnd-kit/core";
import TaskForm from "../components/TaskForm";
import ActivityLog from "../components/ActivityLog";

function Board() {
  const { logout } = useAuth();
  const { resetBoard } = useTasks();
  const [showForm, setShowForm] = useState(false);
   // Search / Filter / Sort state
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If dropped outside any column
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    moveTask(taskId, newStatus);
  };

  return (
    <div>
      <h2>Task Board</h2>

      <button onClick={logout}>Logout</button>
      <button onClick={() => setShowForm(true)}>Add Task</button>
      <button onClick={resetBoard}>Reset Board</button>
       
       {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* SORT */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">No Sort</option>
        <option value="asc">Due Date Asc</option>
        <option value="desc">Due Date Desc</option>
      </select>

      {showForm && <TaskForm closeForm={() => setShowForm(false)} />}

      {/* Drag & Drop Context */}
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Column
            status="Todo"
            search={search}
            filterPriority={filterPriority}
            sortOrder={sortOrder}
          />
          <Column
            status="Doing"
            search={search}
            filterPriority={filterPriority}
            sortOrder={sortOrder}
          />
          <Column
            status="Done"
            search={search}
            filterPriority={filterPriority}
            sortOrder={sortOrder}
          />
        </div>
      </DndContext>
      <ActivityLog />
    </div>
  );
}

export default Board;
