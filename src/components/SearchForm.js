import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Filter, Sparkles } from 'lucide-react';

function SearchForm({ onSearch, popularDestinations = [] }) {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);

  // Popular destinations for suggestions
  const destinations = [
    'Goa', 'Manali', 'Kerala', 'Rishikesh', 'Udaipur', 'Jaipur', 
    'Varanasi', 'Agra', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ destination, departureDate, returnDate, travelers });
    }
  };

  const handleDestinationSelect = (dest) => {
    setDestination(dest);
    setShowSuggestions(false);
  };

  const filteredDestinations = destinations.filter(dest =>
    dest.toLowerCase().includes(destination.toLowerCase())
  );

  // Set minimum date for departure
  const today = new Date().toISOString().split('T')[0];
  const minReturnDate = departureDate || today;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700"
      >
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Find Your Perfect Trip
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Discover amazing destinations across India with trusted providers
          </p>
        </div>

        {/* Main Search Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="mobile-input w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Destination Suggestions */}
            {showSuggestions && destination && filteredDestinations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredDestinations.map((dest, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDestinationSelect(dest)}
                    className="w-full px-4 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Departure Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={today}
                className="mobile-input w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Return Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={minReturnDate}
                className="mobile-input w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Travelers
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="mobile-input w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="mb-4 sm:mb-6">
          <button
            type="button"
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="touch-target flex items-center space-x-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors duration-200 py-2"
          >
            <Filter size={16} />
            <span className="text-sm font-medium">
              {isAdvanced ? 'Hide' : 'Show'} Advanced Options
            </span>
          </button>
        </div>

        {/* Advanced Options */}
        {isAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Budget Range
              </label>
              <select className="mobile-input w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                <option>Any Budget</option>
                <option>Under ₹10,000</option>
                <option>₹10,000 - ₹25,000</option>
                <option>₹25,000 - ₹50,000</option>
                <option>Above ₹50,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Trip Type
              </label>
              <select className="mobile-input w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                <option>Any Type</option>
                <option>Adventure</option>
                <option>Relaxation</option>
                <option>Cultural</option>
                <option>Wildlife</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Group Size
              </label>
              <select className="mobile-input w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                <option>Any Size</option>
                <option>Small (2-6 people)</option>
                <option>Medium (7-12 people)</option>
                <option>Large (13+ people)</option>
              </select>
            </div>
          </div>
        )}

        {/* Popular Destinations */}
        {popularDestinations.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
              <Sparkles size={16} className="mr-2 text-sky-500" />
              Popular Destinations
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((dest, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDestinationSelect(dest._id || dest)}
                  className="touch-target px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-200"
                >
                  {dest._id || dest} {dest.count && `(${dest.count})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn-mobile bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
          >
            <Search size={20} />
            <span>Search Trips</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
