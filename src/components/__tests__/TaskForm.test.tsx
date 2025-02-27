import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../TaskForm";

describe("TaskForm Component", () => {
  const mockAddTask = jest.fn();

  beforeEach(() => {
    mockAddTask.mockClear();
  });

  test("renders form elements correctly", () => {
    render(<TaskForm onAddTask={mockAddTask} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  test("submits form with valid data", () => {
    render(<TaskForm onAddTask={mockAddTask} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2023-12-31" },
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: "High" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Check if onAddTask was called with the correct data
    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Task",
        description: "Test Description",
        dueDate: "2023-12-31",
        priority: "High",
        completed: false,
      })
    );
  });

  test("does not submit form with empty title", () => {
    render(<TaskForm onAddTask={mockAddTask} />);

    // Submit form without filling title
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Check that onAddTask was not called
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  test("resets form after submission", () => {
    render(<TaskForm onAddTask={mockAddTask} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Check if form was reset
    expect(screen.getByLabelText(/title/i)).toHaveValue("");
    expect(screen.getByLabelText(/description/i)).toHaveValue("");
  });
});
