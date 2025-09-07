import React, { useState } from 'react';
import { Users, Building, Instagram, Check, X } from 'lucide-react';

function ProviderFilter({ 
  providers = [], 
  selectedProviders = [], 
  setSelectedProviders = () => {},
  selected = [],
  onChange = () => {}
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle both old and new prop formats
  const currentProviders = providers.length > 0 ? providers : [
    { name: 'MakeMyTrip', type: 'Travel Agency', followers: 15000, verified: true },
    { name: 'Goibibo', type: 'Travel Agency', followers: 12000, verified: true },
    { name: 'EaseMyTrip', type: 'Travel Agency', followers: 8000, verified: true },
    { name: 'TravelGuru', type: 'Travel Agency', followers: 6000, verified: false },
    { name: 'Yatra', type: 'Travel Agency', followers: 10000, verified: true },
    { name: 'Wanderlust Adventures', type: 'Instagram Group', followers: 45200, verified: true },
    { name: 'Mountain Explorers', type: 'Private Provider', followers: 28900, verified: true },
    { name: 'Kerala Dreams', type: 'Travel Agency', followers: 67300, verified: true }
  ];

  const currentSelectedProviders = selectedProviders.length > 0 ? selectedProviders : selected;

  const handleSelectedProvidersChange = (newSelected) => {
    if (setSelectedProviders) {
      setSelectedProviders(newSelected);
    } else if (onChange) {
      onChange(newSelected);
    }
  };

  const providerTypes = [
    { value: 'Instagram Group', label: 'Instagram Groups', icon: <Instagram size={16} />, color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' },
    { value: 'Private Provider', label: 'Private Providers', icon: <Users size={16} />, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
    { value: 'Travel Agency', label: 'Travel Agencies', icon: <Building size={16} />, color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' }
  ];

  const handleProviderToggle = (provider) => {
    if (currentSelectedProviders.includes(provider)) {
      handleSelectedProvidersChange(currentSelectedProviders.filter(p => p !== provider));
    } else {
      handleSelectedProvidersChange([...currentSelectedProviders, provider]);
    }
  };

  const handleTypeToggle = (type) => {
    const providersOfType = currentProviders.filter(p => p.type === type).map(p => p.name);
    const allSelected = providersOfType.every(p => currentSelectedProviders.includes(p));
    
    if (allSelected) {
      handleSelectedProvidersChange(currentSelectedProviders.filter(p => !providersOfType.includes(p)));
    } else {
      const newSelected = [...currentSelectedProviders];
      providersOfType.forEach(p => {
        if (!newSelected.includes(p)) {
          newSelected.push(p);
        }
      });
      handleSelectedProvidersChange(newSelected);
    }
  };

  const clearAll = () => {
    handleSelectedProvidersChange([]);
  };

  const selectAll = () => {
    handleSelectedProvidersChange(currentProviders.map(p => p.name));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Providers</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAll}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
            >
              Clear
            </button>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <button
              onClick={selectAll}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200"
            >
              Select All
            </button>
          </div>
        </div>
        
        {currentSelectedProviders.length > 0 && (
          <div className="mt-2">
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              {currentSelectedProviders.length} provider{currentSelectedProviders.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex flex-wrap gap-1">
              {currentSelectedProviders.slice(0, 3).map((provider) => (
                <span
                  key={provider}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-xs"
                >
                  {provider}
                  <button
                    onClick={() => handleProviderToggle(provider)}
                    className="hover:text-sky-900 dark:hover:text-sky-100"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {currentSelectedProviders.length > 3 && (
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full text-xs">
                  +{currentSelectedProviders.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Provider Types */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Provider Types</h4>
        <div className="space-y-2">
          {providerTypes.map((type) => {
            const providersOfType = currentProviders.filter(p => p.type === type.value);
            const selectedCount = providersOfType.filter(p => currentSelectedProviders.includes(p.name)).length;
            const isAllSelected = providersOfType.length > 0 && selectedCount === providersOfType.length;
            const isPartiallySelected = selectedCount > 0 && selectedCount < providersOfType.length;

            return (
              <button
                key={type.value}
                onClick={() => handleTypeToggle(type.value)}
                className={`w-full flex items-center justify-between p-2 rounded-md transition-all duration-200 ${
                  isAllSelected
                    ? 'bg-sky-100 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700'
                    : isPartiallySelected
                    ? 'bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${type.color}`}>
                    {type.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {type.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedCount}/{providersOfType.length}
                  </span>
                  {isAllSelected && <Check size={14} className="text-sky-600 dark:text-sky-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Individual Providers */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">All Providers</h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
          >
            {isExpanded ? 'Show Less' : 'Show All'}
          </button>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {(isExpanded ? currentProviders : currentProviders.slice(0, 5)).map((provider) => (
            <label
              key={provider.name}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={currentSelectedProviders.includes(provider.name)}
                onChange={() => handleProviderToggle(provider.name)}
                className="w-4 h-4 text-sky-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-sky-500 dark:focus:ring-sky-400"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {provider.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {provider.followers} followers
                </div>
              </div>
              {provider.verified && (
                <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                  Verified
                </div>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProviderFilter;
