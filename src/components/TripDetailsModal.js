import React, { useState } from 'react';
import { Star, Share2, X, Calendar, Users, MapPin, Clock, Heart, Phone, Mail, Globe, Check, X as XIcon, Tag, Shield, Award, Loader2 } from 'lucide-react';

const MOCK_REVIEWS = [
  {
    user: 'Amit S.',
    rating: 5,
    text: 'Amazing experience! The trip was perfectly organized and exceeded all expectations. Highly recommend this provider.',
    date: '2024-01-15',
    avatar: 'AS'
  },
  {
    user: 'Priya K.',
    rating: 4,
    text: 'Beautiful destination and great service. The accommodation was comfortable and the activities were well-planned.',
    date: '2024-01-10',
    avatar: 'PK'
  },
  {
    user: 'Rahul D.',
    rating: 5,
    text: 'One of the best holidays I have had in India! The group was friendly and the guide was very knowledgeable.',
    date: '2024-01-05',
    avatar: 'RD'
  },
];

function TripDetailsModal({ trip, onClose, onShare, onFavorite, isFavorited = false }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isSharing, setIsSharing] = useState(false); // Add sharing state

  if (!trip) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const reviewsToShow = showAllReviews ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 2);

  // Enhanced share handler with loading state
  const handleShare = async () => {
    if (isSharing || !onShare) return;
    
    setIsSharing(true);
    try {
      await onShare(trip);
    } catch (error) {
      console.error('Share error in modal:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative animate-fadeIn">
        {/* Header */}
        <div className="relative h-64 md:h-80">
          <img 
            src={trip.imageUrl} 
            alt={trip.destination} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => onFavorite(trip)}
            className={`absolute top-4 right-16 p-2 rounded-full transition-all duration-200 ${
              isFavorited
                ? 'bg-red-500 text-white'
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className={`absolute top-4 right-28 p-2 rounded-full transition-all duration-200 ${
              isSharing 
                ? 'bg-slate-400/50 cursor-not-allowed' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            {isSharing ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Share2 size={20} />
            )}
          </button>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium">
                {trip.provider?.type || 'Travel Provider'}
              </div>
              {trip.provider?.verified && (
                <div className="px-2 py-1 bg-green-500/80 backdrop-blur-sm rounded text-xs font-medium flex items-center gap-1">
                  <Shield size={12} />
                  Verified
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                {trip.destination}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDate(trip.departureDate)}
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />
                {trip.groupSize}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-320px)]">
          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div>
              {trip.originalCost && trip.originalCost > trip.cost && (
                <div className="text-slate-500 dark:text-slate-400 text-sm line-through">
                  {formatPrice(trip.originalCost)}
                </div>
              )}
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                {formatPrice(trip.cost)}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                per person
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < trip.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'} 
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {trip.rating}
                </span>
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                {trip.totalReviews} reviews
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
            {['overview', 'itinerary', 'reviews', 'provider'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm capitalize transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Trip Overview
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {trip.description}
                </p>

                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <Clock className="text-sky-500" size={20} />
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">Duration</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{trip.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <Users className="text-sky-500" size={20} />
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">Group Size</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{trip.groupSize}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <Calendar className="text-sky-500" size={20} />
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">Departure</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{formatDate(trip.departureDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <Calendar className="text-sky-500" size={20} />
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">Return</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{formatDate(trip.returnDate)}</div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                {trip.highlights && trip.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {trip.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="text-green-500" size={16} />
                          <span className="text-slate-600 dark:text-slate-400">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What's Included */}
                {trip.includes && trip.includes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">What's Included</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {trip.includes.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="text-green-500" size={16} />
                          <span className="text-slate-600 dark:text-slate-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What's Not Included */}
                {trip.excludes && trip.excludes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">What's Not Included</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {trip.excludes.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <XIcon className="text-red-500" size={16} />
                          <span className="text-slate-600 dark:text-slate-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Day-by-Day Itinerary
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((day) => (
                    <div key={day} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Day {day}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Detailed itinerary for day {day} will be provided by the tour operator.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Customer Reviews
                </h3>
                <div className="space-y-4">
                  {reviewsToShow.map((review, index) => (
                    <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {review.user}
                            </span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(review.date)}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  ))}
                  {MOCK_REVIEWS.length > 2 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="w-full py-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors duration-200"
                    >
                      {showAllReviews ? 'Show Less' : `Show ${MOCK_REVIEWS.length - 2} More Reviews`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'provider' && trip.provider && (
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  About the Provider
                </h3>
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                        {trip.provider.name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        {trip.provider.type} • {trip.provider.followers} followers
                      </p>
                    </div>
                    {trip.provider.verified && (
                      <div className="ml-auto px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium flex items-center gap-1">
                        <Shield size={14} />
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Phone size={16} />
                      <span>+91-98765-43210</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Mail size={16} />
                      <span>contact@provider.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Globe size={16} />
                      <span>www.provider.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Users size={16} />
                      <span>{trip.provider.followers} followers</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {formatPrice(trip.cost)}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                per person • {trip.availableSeats} seats available
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                disabled={isSharing}
                className={`px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                  isSharing 
                    ? 'bg-slate-100 dark:bg-slate-700 cursor-not-allowed' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {isSharing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    Share
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  // Handle booking
                  window.open(`https://wa.me/919876543210?text=I'm interested in ${trip.title}`, '_blank');
                }}
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
}

export default TripDetailsModal;
