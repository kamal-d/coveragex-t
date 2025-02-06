// import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../src/App";

jest.mock("axios");

describe("App Component", () => {
  const tasks = [
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: tasks });
  });

  test("renders the App component", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
      expect(screen.getByText("Task List")).toBeInTheDocument();
    });
  });

  test("fetches and displays tasks", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Description 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
      expect(screen.getByText("Description 2")).toBeInTheDocument();
    });
  });

  test("adds a new task", async () => {
    axios.post.mockResolvedValue({ status: 201 });
    render(<App />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Description" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://coverage-back.test/api/tasks",
        {
          title: "New Task",
          description: "New Description",
        }
      );
    });
  });

  test("deletes a task", async () => {
    axios.delete.mockResolvedValue({ status: 200 });
    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Done", { selector: "button" })[0]);
    });

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://coverage-back.test/api/tasks/1"
      );
    });
  });
});
