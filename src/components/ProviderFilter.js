import React from 'react';

const PROVIDERS = ['MakeMyTrip', 'Goibibo', 'EaseMyTrip', 'TravelGuru', 'Yatra'];

function ProviderFilter({ selected, onChange }) {
  return (
    <div className="flex items-center gap-3 my-2 flex-wrap">
      <label className="text-slate-600 font-medium">Providers:</label>
      {PROVIDERS.map(provider => (
        <label key={provider} className="flex items-center gap-1 text-slate-500 text-sm font-medium">
          <input
            type="checkbox"
            checked={selected.includes(provider)}
            onChange={e => {
              if (e.target.checked) {
                onChange([...selected, provider]);
              } else {
                onChange(selected.filter(p => p !== provider));
              }
            }}
            className="accent-sky-500"
          />
          {provider}
        </label>
      ))}
    </div>
  );
}

export default ProviderFilter;
