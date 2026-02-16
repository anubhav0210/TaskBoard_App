// TaskForm.jsx
// Form for creating and editing tasks

import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm({ existingTask, closeForm, defaultStatus }) {
  const { createTask, updateTask } = useTasks();

  // Initialize form with existing task if editing
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [priority, setPriority] = useState(existingTask?.priority || "Low");
  const [status] = useState(
    existingTask?.status || defaultStatus || "Todo"
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Title required
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const taskData = { title, description, priority, dueDate, status };

    if (existingTask) {
      updateTask(existingTask.id, taskData);
    } else {
      createTask(taskData);
    }

    closeForm();
  };

  return (
    <div className="task-form">
      <h3>{existingTask ? "Edit Task" : "Create Task"}</h3>

      <form onSubmit={handleSubmit}>
        <label>
          <div>Title</div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <div>Description</div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </label>

        <label>
          <div>Priority</div>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label>
          <div>Due date</div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <div style={{ marginTop: 8 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={closeForm} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default TaskForm;
