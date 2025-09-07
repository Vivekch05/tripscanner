import React, { useState } from 'react';
import { X, Star, Users, Calendar, MapPin, Clock, Tag, Heart, Share2, Check, X as XIcon } from 'lucide-react';

const TripComparison = ({ trips, onClose, onRemoveTrip, onFavorite, onShare, favorites = [] }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'provider', label: 'Provider' }
  ];

  if (!trips || trips.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Compare Trips ({trips.length})
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Compare features, pricing, and details side by side
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            <X size={24} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[60vh]">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${trips.length}, 1fr)` }}>
            {/* Trip Headers */}
            {trips.map((trip, index) => (
              <div key={trip.id} className="p-6 border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                <div className="relative">
                  <img
                    src={trip.imageUrl}
                    alt={trip.title}
                    className="w-full h-32 object-cover rounded-xl mb-4"
                  />
                  <button
                    onClick={() => onRemoveTrip(trip.id)}
                    className="absolute top-2 right-2 p-1 bg-white/90 dark:bg-slate-800/90 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200"
                  >
                    <XIcon size={16} />
                  </button>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                  {trip.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-3">
                  <MapPin size={14} />
                  {trip.destination}
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  {formatPrice(trip.cost)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onFavorite(trip)}
                    className={`flex-1 p-2 rounded-lg transition-colors duration-200 ${
                      favorites.some(fav => fav.id === trip.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart size={16} fill={favorites.some(fav => fav.id === trip.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => onShare(trip)}
                    className="flex-1 p-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-sky-500 hover:text-white transition-colors duration-200"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid" style={{ gridTemplateColumns: `repeat(${trips.length}, 1fr)` }}>
                {trips.map((trip, index) => (
                  <div key={trip.id} className="p-4 border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Duration</h4>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Clock size={16} />
                          {trip.duration}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Group Size</h4>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Users size={16} />
                          {trip.groupSize}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Rating</h4>
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="text-slate-600 dark:text-slate-400">{trip.rating}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Availability</h4>
                        <div className="text-slate-600 dark:text-slate-400">
                          {trip.availableSeats} of {trip.totalSeats} seats left
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="p-6">
              <div className="grid" style={{ gridTemplateColumns: `repeat(${trips.length}, 1fr)` }}>
                {trips.map((trip, index) => (
                  <div key={trip.id} className="p-4 border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Description</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {trip.description}
                        </p>
                      </div>
                      {trip.highlights && trip.highlights.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Highlights</h4>
                          <div className="space-y-1">
                            {trip.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                <Check size={14} className="text-green-500" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="p-6">
              <div className="grid" style={{ gridTemplateColumns: `repeat(${trips.length}, 1fr)` }}>
                {trips.map((trip, index) => (
                  <div key={trip.id} className="p-4 border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Price</h4>
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          {formatPrice(trip.cost)}
                        </div>
                        {trip.originalCost && trip.originalCost > trip.cost && (
                          <div className="text-slate-500 dark:text-slate-400 text-sm line-through">
                            {formatPrice(trip.originalCost)}
                          </div>
                        )}
                      </div>
                      {trip.discount && trip.discount > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Discount</h4>
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <Tag size={16} />
                            {trip.discount}% OFF
                          </div>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">What's Included</h4>
                        <div className="space-y-1">
                          {trip.includes && trip.includes.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                              <Check size={14} className="text-green-500" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'provider' && (
            <div className="p-6">
              <div className="grid" style={{ gridTemplateColumns: `repeat(${trips.length}, 1fr)` }}>
                {trips.map((trip, index) => (
                  <div key={trip.id} className="p-4 border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                    <div className="space-y-4">
                      {trip.provider && typeof trip.provider === 'object' && (
                        <>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Provider</h4>
                            <div className="text-slate-600 dark:text-slate-400">
                              {trip.provider.name}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Type</h4>
                            <div className="text-slate-600 dark:text-slate-400">
                              {trip.provider.type}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Followers</h4>
                            <div className="text-slate-600 dark:text-slate-400">
                              {trip.provider.followers?.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Verification</h4>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              trip.provider.verified
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            }`}>
                              {trip.provider.verified ? 'Verified' : 'Not Verified'}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Compare up to 3 trips at once
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg hover:from-sky-600 hover:to-indigo-700 transition-all duration-200 font-medium"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripComparison;

