import { render, screen } from "@testing-library/react";
import Column from "../components/Column";
import { TaskProvider } from "../context/TaskContext";

test("renders column title", () => {
  render(
    <TaskProvider>
      <Column status="Todo" search="" filterPriority="All" sortOrder="" />
    </TaskProvider>
  );

  expect(screen.getByText("Todo")).toBeInTheDocument();
});
