import React from 'react';
import { Star, Share2 } from 'lucide-react';

const MOCK_REVIEWS = [
  {
    user: 'Amit S.',
    rating: 5,
    text: 'Amazing experience! Highly recommend this trip.',
  },
  {
    user: 'Priya K.',
    rating: 4,
    text: 'Beautiful destination and great service.',
  },
  {
    user: 'Rahul D.',
    rating: 5,
    text: 'One of the best holidays I have had in India!',
  },
];

function TripDetailsModal({ trip, onClose, onShare }) {
  if (!trip) return null;
  const rating = trip.rating || 4 + Math.round(Math.random());
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-[90vw] p-6 relative animate-fadeIn max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-slate-400 hover:text-sky-500 transition"
          aria-label="Close"
        >
          &times;
        </button>
        <img src={trip.imageUrl} alt={trip.destination} className="w-full rounded-lg mb-4 aspect-[16/10] object-cover" />
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-slate-800">{trip.destination}</h2>
          <button
            type="button"
            className="text-slate-400 hover:text-sky-500 transition"
            onClick={() => onShare(trip)}
            aria-label="Share trip"
          >
            <Share2 size={20} />
          </button>
        </div>
        <div className="text-slate-500 mb-1">Provider: <b>{trip.provider}</b></div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'} />
            ))}
            <span className="ml-1 text-xs text-slate-400">{rating}.0</span>
          </div>
          <div className="text-sky-600 font-bold text-lg ml-auto">{trip.cost}</div>
        </div>
        <p className="text-slate-600 mb-4">{trip.description}</p>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(trip.provider + ' ' + trip.destination)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold text-base shadow-md transition mb-4"
        >
          Book Now
        </a>
        <div className="mt-4">
          <div className="font-semibold text-slate-700 mb-2">User Reviews</div>
          <div className="space-y-2">
            {MOCK_REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-700 text-sm">{review.user}</span>
                  <span className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'} />
                    ))}
                  </span>
                </div>
                <div className="text-slate-600 text-xs">{review.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetailsModal;
