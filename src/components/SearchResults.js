import React from 'react';
import TripCard from './TripCard';
import { Search, MapPin, Loader2, Filter } from 'lucide-react';

function SearchResults({ 
  trips = [], 
  loading = false, 
  onTripClick, 
  onFavorite, 
  favorites = [], 
  onShare, 
  searchQuery = '',
  onAddToComparison,
  onOpenChat
}) {
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-sky-600 dark:text-sky-400 animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Searching for amazing trips...
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            We're finding the best travel experiences for you
          </p>
        </div>
        
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-slate-200 dark:bg-slate-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!trips.length) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
            <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No trips found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {searchQuery ? `We couldn't find any trips for "${searchQuery}"` : 'Try searching for a different destination'}
          </p>
          
          {/* Suggestions */}
          <div className="max-w-md mx-auto">
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">Popular destinations to try:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Goa', 'Manali', 'Kerala', 'Rishikesh', 'Udaipur'].map((dest) => (
                <button
                  key={dest}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-200"
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
      {/* Results Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {searchQuery ? `Trips to ${searchQuery}` : 'All Available Trips'}
            </h2>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <MapPin size={14} />
              <span className="text-sm">{trips.length} {trips.length === 1 ? 'trip' : 'trips'} found</span>
            </div>
          </div>
          
          {/* Results Stats */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Filter size={14} />
              <span className="hidden sm:inline">Filtered by your preferences</span>
              <span className="sm:hidden">Filtered</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-right">
              <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                {trips.length} results
              </div>
              <div className="text-xs">Sorted by relevance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {trips.map(trip => (
          <TripCard
            key={trip.id || trip._id}
            trip={trip}
            onTripClick={() => onTripClick && onTripClick(trip)}
            onFavorite={onFavorite}
            isFavorited={favorites && favorites.some(fav => 
              (fav.id || fav._id) === (trip.id || trip._id)
            )}
            onShare={onShare}
            onAddToComparison={onAddToComparison}
            onOpenChat={onOpenChat}
          />
        ))}
      </div>

      {/* Load More Button (if needed) */}
      {trips.length >= 6 && (
        <div className="text-center mt-8 sm:mt-12">
          <button className="btn-mobile px-6 sm:px-8 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium">
            Load More Trips
          </button>
        </div>
      )}

      {/* No More Results */}
      {trips.length > 0 && trips.length < 6 && (
        <div className="text-center mt-6 sm:mt-8 py-4 sm:py-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResults; 