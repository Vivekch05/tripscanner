import React, { useState } from 'react';
import { Star, Heart, HeartOff, Share2 } from 'lucide-react';

function TripCard({ trip, onClick, onFavorite, isFavorite, onShare }) {
  // Mock rating (random 4-5 stars)
  const rating = trip.rating || 4 + Math.round(Math.random());
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl duration-200 relative"
      onClick={onClick}
    >
      <img
        src={trip.imageUrl}
        alt={trip.destination}
        className="w-full aspect-[16/10] object-cover"
      />
      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-slate-800">{trip.destination}</h2>
          <button
            type="button"
            className={`ml-2 ${isFavorite ? 'text-pink-500' : 'text-slate-300'} hover:text-pink-500 transition`}
            onClick={e => { e.stopPropagation(); onFavorite(trip); }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <Heart fill="#ec4899" /> : <Heart />}
          </button>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
          Provider: <span className="font-semibold">{trip.provider}</span>
          <span className="flex items-center ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'} />
            ))}
            <span className="ml-1 text-xs text-slate-400">{rating}.0</span>
          </span>
        </div>
        <div className="text-sky-600 font-bold text-lg mb-1">{trip.cost}</div>
        <p className="text-slate-600 text-sm mb-2">{trip.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold w-max">View Details</span>
          <button
            type="button"
            className="ml-auto text-slate-400 hover:text-sky-500 transition"
            onClick={e => { e.stopPropagation(); onShare(trip); }}
            aria-label="Share trip"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard; 