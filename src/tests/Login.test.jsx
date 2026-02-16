import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

test("shows error on wrong login", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "wrong@test.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "1234" },
  });

  fireEvent.click(screen.getByText("Login"));

  expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
});
