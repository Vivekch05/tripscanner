import React from 'react';

function RecentSearches({ searches, onSelect }) {
  if (!searches.length) return null;
  return (
    <div className="my-2 text-slate-600">
      <div className="font-semibold mb-1">Recent Searches:</div>
      <div className="flex gap-2 flex-wrap">
        {searches.map((search, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(search)}
            className="bg-sky-100 hover:bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold transition shadow-sm border border-sky-200"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;
