import { render, screen } from "@testing-library/react";
import { TaskProvider } from "../context/TaskContext";
import Board from "../pages/Board";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

test("renders board correctly", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Board />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  expect(screen.getByText("Task Board")).toBeInTheDocument();
});
