import React from 'react';
import { DollarSign, Minus } from 'lucide-react';

function PriceRangeFilter({ 
  price, 
  setPrice, 
  minPrice = 5000, 
  maxPrice = 50000,
  min,
  max,
  value,
  onChange
}) {
  // Handle both old and new prop formats
  const currentPrice = price || value || 40000;
  const currentMinPrice = minPrice || min || 5000;
  const currentMaxPrice = maxPrice || max || 50000;
  
  const handlePriceChange = (newPrice) => {
    if (setPrice) {
      setPrice(newPrice);
    } else if (onChange) {
      onChange(newPrice);
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="text-sky-500" size={18} />
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Price Range</h3>
      </div>
      
      <div className="space-y-4">
        {/* Price Display */}
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {formatPrice(currentPrice)}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Maximum price per person
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min={currentMinPrice}
            max={currentMaxPrice}
            value={currentPrice}
            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((currentPrice - currentMinPrice) / (currentMaxPrice - currentMinPrice)) * 100}%, #e2e8f0 ${((currentPrice - currentMinPrice) / (currentMaxPrice - currentMinPrice)) * 100}%, #e2e8f0 100%)`
            }}
          />
          
          {/* Price Range Labels */}
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span>{formatPrice(currentMinPrice)}</span>
            <span>{formatPrice(currentMaxPrice)}</span>
          </div>
        </div>

        {/* Quick Price Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Budget', value: 15000 },
            { label: 'Mid-Range', value: 30000 },
            { label: 'Premium', value: 40000 },
            { label: 'Luxury', value: 50000 }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handlePriceChange(option.value)}
              className={`px-3 py-2 text-xs rounded-md transition-all duration-200 ${
                currentPrice === option.value
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default PriceRangeFilter;
