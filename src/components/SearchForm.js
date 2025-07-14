import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';

function SearchForm({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ destination, departureDate, returnDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center bg-white/80 shadow-lg rounded-xl p-6 mt-8 mb-4 max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Search size={20} className="text-sky-500" />
        <input
          type="text"
          placeholder="Destination (e.g., Goa, Manali, Kerala)"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition w-full md:w-56 text-base font-sans"
        />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Calendar size={20} className="text-sky-500" />
        <input
          type="date"
          value={departureDate}
          onChange={e => setDepartureDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition text-base font-sans"
        />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Calendar size={20} className="text-sky-500" />
        <input
          type="date"
          value={returnDate}
          onChange={e => setReturnDate(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition text-base font-sans"
        />
      </div>
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded-lg font-semibold text-base shadow-md transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
