import React from 'react';
import TripCard from './TripCard';

function SearchResults({ trips, loading, onTripClick, onFavorite, favorites, onShare }) {
  if (loading) {
    return (
      <div className="text-center my-8 text-lg text-sky-500 font-semibold animate-pulse">
        Searching for trips...
      </div>
    );
  }
  if (!trips.length) {
    return (
      <div className="text-center my-8 text-slate-400 text-base">
        No trips found. Try a different destination!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8 w-full max-w-6xl mx-auto">
      {trips.map(trip => (
        <TripCard
          key={trip.id}
          trip={trip}
          onClick={() => onTripClick(trip)}
          onFavorite={onFavorite}
          isFavorite={favorites && favorites.some(fav => fav.id === trip.id)}
          onShare={onShare}
        />
      ))}
    </div>
  );
}

export default SearchResults; 