// TaskForm.jsx
// Form for creating and editing tasks

import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm({ existingTask, closeForm }) {
  const { createTask, updateTask } = useTasks();

  // Initialize form with existing task if editing
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [priority, setPriority] = useState(existingTask?.priority || "Low");
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Title required
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const taskData = { title, description, priority, dueDate };

    if (existingTask) {
      updateTask(existingTask.id, taskData);
    } else {
      createTask(taskData);
    }

    closeForm();
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h3>{existingTask ? "Edit Task" : "Create Task"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <br /><br />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <br /><br />

        <button type="submit">Save</button>
        <button type="button" onClick={closeForm}>
          Cancel
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default TaskForm;
