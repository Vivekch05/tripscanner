import React from 'react';

function SortFilter({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <label className="text-slate-600 font-medium">Sort by:</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-300 text-base font-sans focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="provider">Provider</option>
      </select>
    </div>
  );
}

export default SortFilter;
