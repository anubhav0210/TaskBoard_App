// TaskContext.jsx
// This file manages all task-related state and logic globally

import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

// Custom hook to use task context anywhere
// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  // TASK STATE
  const [tasks, setTasks] = useState([]);

  // ACTIVITY LOG STATE
  const [activityLog, setActivityLog] = useState([]);

  // ----------------------------------------
  // Load data safely from localStorage on mount
  // ----------------------------------------
  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const storedLog = JSON.parse(localStorage.getItem("activityLog")) || [];

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTasks(storedTasks);
      setActivityLog(storedLog);
    } catch {
      console.error("Storage corrupted. Resetting...");
      localStorage.removeItem("tasks");
      localStorage.removeItem("activityLog");
    }
  }, []);

  // ----------------------------------------
  // Save tasks whenever they change
  // ----------------------------------------
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("activityLog", JSON.stringify(activityLog));
  }, [activityLog]);

  // ----------------------------------------
  // Add Activity Log Entry
  // ----------------------------------------
  const addLog = (message) => {
    const newEntry = {
      id: uuidv4(),
      message,
      time: new Date().toLocaleString(),
    };

    // Add newest on top
    setActivityLog((prev) => [newEntry, ...prev]);
  };

  // ----------------------------------------
  // CREATE TASK
  // ----------------------------------------
  const createTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "Low",
      dueDate: taskData.dueDate || "",
      tags: taskData.tags || [],
      status: taskData.status || "Todo", // respect provided status or default to Todo
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    addLog(`Task "${newTask.title}" created`);
  };

  // ----------------------------------------
  // UPDATE TASK
  // ----------------------------------------
  const updateTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );

    addLog(`Task updated`);
  };

  // ----------------------------------------
  // DELETE TASK
  // ----------------------------------------
  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const taskToDelete = prevTasks.find((task) => task.id === id);
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      
      // Log after state is updated
      setTimeout(() => {
        if (taskToDelete) {
          addLog(`Task "${taskToDelete.title}" deleted`);
        }
      }, 0);
      
      return updatedTasks;
    });
  };

  // ----------------------------------------
  // MOVE TASK (Drag & Drop)
  // ----------------------------------------
  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    addLog(`Task moved to ${newStatus}`);
  };

  // ----------------------------------------
  // RESET BOARD
  // ----------------------------------------
  const resetBoard = () => {
    if (window.confirm("Are you sure you want to reset the board?")) {
      setTasks([]);
      setActivityLog([]);
      localStorage.removeItem("tasks");
      localStorage.removeItem("activityLog");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activityLog,
        createTask,
        updateTask,
        deleteTask,
        moveTask,
        resetBoard,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
