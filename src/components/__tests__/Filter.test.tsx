import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../Filter";

describe("Filter Component", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  test("renders filter buttons correctly", () => {
    render(<Filter onFilterChange={mockOnFilterChange} currentFilter={null} />);

    expect(screen.getByText(/filter by priority/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /high/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /low/i })).toBeInTheDocument();
  });

  test("calls onFilterChange when a filter button is clicked", () => {
    render(<Filter onFilterChange={mockOnFilterChange} currentFilter={null} />);

    const highButton = screen.getByRole("button", { name: /high/i });
    fireEvent.click(highButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("High");
  });

  test("shows active state for selected filter", () => {
    render(
      <Filter onFilterChange={mockOnFilterChange} currentFilter="Medium" />
    );

    const mediumButton = screen.getByRole("button", { name: /medium/i });
    expect(mediumButton).toHaveClass("bg-yellow-100");
  });

  test("shows clear button when a filter is active", () => {
    render(<Filter onFilterChange={mockOnFilterChange} currentFilter="Low" />);

    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  test("clears filter when clear button is clicked", () => {
    render(<Filter onFilterChange={mockOnFilterChange} currentFilter="High" />);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith(null);
  });

  test("toggles filter when clicking the same filter twice", () => {
    render(<Filter onFilterChange={mockOnFilterChange} currentFilter="High" />);

    const highButton = screen.getByRole("button", { name: /high/i });
    fireEvent.click(highButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith(null);
  });
});
