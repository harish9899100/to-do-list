
import React from 'react';
import { FilterType } from './TodoApp';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

const TodoFilter = ({ currentFilter, onFilterChange, activeCount, completedCount }: TodoFilterProps) => {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: activeCount + completedCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="p-4 bg-gray-50 border-b border-gray-100">
      <div className="flex justify-center gap-1">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentFilter === filter.key
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white'
            }`}
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                currentFilter === filter.key
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
