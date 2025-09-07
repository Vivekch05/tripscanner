import React from 'react';
import { Clock, MapPin, Calendar, X, Search } from 'lucide-react';

function RecentSearches({ 
  searches = [], 
  onSearch, 
  onClearSearch, 
  onClearAll, 
  onSelect 
}) {
  // Handle both old and new prop formats
  const handleSearch = (search) => {
    if (onSearch) {
      onSearch(search);
    } else if (onSelect) {
      onSelect(search);
    }
  };

  const handleClearSearch = (index) => {
    if (onClearSearch) {
      onClearSearch(index);
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  if (!searches.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full mb-3">
            <Search className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No Recent Searches
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Your recent searches will appear here
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-sky-500" size={18} />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Recent Searches</h3>
          </div>
          <button
            onClick={handleClearAll}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Searches List */}
      <div className="p-4">
        <div className="space-y-3">
          {searches.slice(0, 5).map((search, index) => {
            // Handle both string and object formats
            const searchData = typeof search === 'string' ? { destination: search } : search;
            
            return (
              <div
                key={index}
                className="group relative p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                onClick={() => handleSearch(searchData)}
              >
                {/* Clear Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearSearch(index);
                  }}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X size={14} />
                </button>

                {/* Search Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-sky-500" size={16} />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {searchData.destination}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    {searchData.departureDate && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {new Date(searchData.departureDate).toLocaleDateString('en-IN', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                          {searchData.returnDate && ` - ${new Date(searchData.returnDate).toLocaleDateString('en-IN', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}`}
                        </span>
                      </div>
                    )}
                    {searchData.travelers && (
                      <div className="flex items-center gap-1">
                        <span>👥</span>
                        <span>{searchData.travelers} traveler{searchData.travelers > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {searchData.timestamp ? formatDate(searchData.timestamp) : 'Recently'}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400">
                      <Search size={12} />
                      <span>Search again</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {searches.length > 5 && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button className="w-full py-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 text-sm font-medium transition-colors duration-200">
              Show {searches.length - 5} More Searches
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSearches;
