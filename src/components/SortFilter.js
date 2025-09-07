import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Star, DollarSign, Calendar } from 'lucide-react';

function SortFilter({ sort, setSort, value, onChange }) {
  // Handle both old and new prop formats
  const currentSort = sort || value || '';
  
  const handleSortChange = (newSort) => {
    if (setSort) {
      setSort(newSort);
    } else if (onChange) {
      onChange(newSort);
    }
  };

  const sortOptions = [
    { value: '', label: 'Recommended', icon: <ArrowUpDown size={16} /> },
    { value: 'price-low', label: 'Price: Low to High', icon: <DollarSign size={16} /> },
    { value: 'price-high', label: 'Price: High to Low', icon: <DollarSign size={16} /> },
    { value: 'rating', label: 'Highest Rated', icon: <Star size={16} /> },
    { value: 'date', label: 'Departure Date', icon: <Calendar size={16} /> },
    { value: 'duration', label: 'Trip Duration', icon: <Calendar size={16} /> }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Sort By</h3>
      
      <div className="space-y-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-200 ${
              currentSort === option.value
                ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-700'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <div className={`${currentSort === option.value ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'}`}>
              {option.icon}
            </div>
            <span className="text-sm font-medium">{option.label}</span>
            {currentSort === option.value && (
              <div className="ml-auto">
                <ArrowUpDown size={14} className="text-sky-600 dark:text-sky-400" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Quick Sort Pills */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">
          Quick Sort
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'price-low', label: 'Cheapest' },
            { value: 'rating', label: 'Top Rated' },
            { value: 'date', label: 'Soonest' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                currentSort === option.value
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortFilter;
