import React from 'react';

function PriceRangeFilter({ min, max, value, onChange }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <label className="text-slate-600 font-medium">Price Range:</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-32 accent-sky-500"
      />
      <span className="text-sky-600 font-bold min-w-[80px]">₹{value.toLocaleString()}</span>
    </div>
  );
}

export default PriceRangeFilter;
