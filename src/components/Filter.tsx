interface FilterProps {
  onFilterChange: (filter: string | null) => void;
  currentFilter: string | null;
}

const Filter = ({ onFilterChange, currentFilter }: FilterProps) => {
  const handleFilterChange = (priority: string | null) => {
    // If the same filter is clicked again, clear the filter
    if (priority === currentFilter) {
      onFilterChange(null);
    } else {
      onFilterChange(priority);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Filter by Priority</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange("High")}
          className={`px-3 py-1 text-xs rounded-full border ${
            currentFilter === "High"
              ? "bg-red-100 text-red-800 border-red-300"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          High
        </button>
        <button
          onClick={() => handleFilterChange("Medium")}
          className={`px-3 py-1 text-xs rounded-full border ${
            currentFilter === "Medium"
              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => handleFilterChange("Low")}
          className={`px-3 py-1 text-xs rounded-full border ${
            currentFilter === "Low"
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Low
        </button>
        {currentFilter && (
          <button
            onClick={() => onFilterChange(null)}
            className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
