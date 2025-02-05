import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../src/App";

// jest.mock("axios");

describe("App Component", () => {

  test("renders the App component", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
      expect(screen.getByText("Task List")).toBeInTheDocument();
    });
  });
  test("adds a new task", async () => {
    // axios.post.mockResolvedValue({ status: 201 });
    render(<App />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Description" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
      expect(screen.getByText("New Description")).toBeInTheDocument();
    });
  });

  test("fetches and displays tasks", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
      expect(screen.getByText("New Description")).toBeInTheDocument();
    });
  });



  test("deletes a task", async () => {
    // axios.delete.mockResolvedValue({ status: 200 });
    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Done", { selector: "button" })[0]);
    });

    await waitFor(() => {
      expect(screen.queryByText((content, element) => content.startsWith("New Task"))).not.toBeInTheDocument();
      expect(screen.queryByText((content, element) => content.startsWith("New Description"))).not.toBeInTheDocument();
    });
  });
});
