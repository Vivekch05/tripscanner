import React, { useState } from 'react';
import { Heart, Star, Users, Calendar, MapPin, Clock, Tag, Share2, Loader2, Shield, GitCompare, MessageCircle } from 'lucide-react';

const TripCard = ({ 
  trip, 
  onTripClick, 
  onFavorite, 
  onShare,
  isFavorited = false,
  onClick,
  onAddToComparison,
  onOpenChat
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };


  const handleTripClick = () => {
    if (onTripClick) {
      onTripClick(trip);
    } else if (onClick) {
      onClick(trip);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(trip);
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (isSharing || !onShare) return;
    
    setIsSharing(true);
    try {
      await onShare(trip);
    } catch (error) {
      console.error('Share error in card:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleAddToComparison = (e) => {
    e.stopPropagation();
    if (onAddToComparison) {
      onAddToComparison(trip);
    }
  };

  const handleOpenChat = (e) => {
    e.stopPropagation();
    if (onOpenChat && trip.provider) {
      onOpenChat(trip.provider);
    }
  };

  if (!trip) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 card-hover mobile-optimize">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={trip.imageUrl}
          alt={trip.title || trip.destination}
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
          onClick={handleTripClick}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {/* Comparison Button */}
          {onAddToComparison && (
            <button
              onClick={handleAddToComparison}
              className="touch-target p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm bg-white/90 text-slate-600 hover:bg-blue-500 hover:text-white hover:scale-110 shadow-lg"
              title="Add to Comparison"
            >
              <GitCompare size={16} />
            </button>
          )}

          {/* Chat Button */}
          {onOpenChat && trip.provider && (
            <button
              onClick={handleOpenChat}
              className="touch-target p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm bg-white/90 text-slate-600 hover:bg-green-500 hover:text-white hover:scale-110 shadow-lg"
              title="Chat with Provider"
            >
              <MessageCircle size={16} />
            </button>
          )}

          {/* Share Button */}
          {onShare && (
            <button
              onClick={handleShare}
              disabled={isSharing}
              className={`touch-target p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                isSharing 
                  ? 'bg-slate-400/50 cursor-not-allowed' 
                  : 'bg-white/90 text-slate-600 hover:bg-sky-500 hover:text-white hover:scale-110 shadow-lg'
              }`}
              title="Share Trip"
            >
              {isSharing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Share2 size={16} />
              )}
            </button>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`touch-target p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
              isFavorited
                ? 'bg-red-500 text-white shadow-lg scale-110'
                : 'bg-white/90 text-slate-600 hover:bg-red-500 hover:text-white hover:scale-110 shadow-lg'
            }`}
            title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} className={isFavorited ? 'animate-pulse' : ''} />
          </button>
        </div>

        {/* Discount Badge */}
        {trip.discount && trip.discount > 0 && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <Tag size={12} />
            {trip.discount}% OFF
          </div>
        )}

        {/* Provider Badge */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/80 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs font-medium">
          {trip.provider?.type || trip.provider || 'Travel Provider'}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm text-slate-700 px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 shadow-lg">
          <Star size={12} className="text-yellow-500 fill-current" />
          {trip.rating || '4.5'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6" onClick={handleTripClick}>
        {/* Destination & Title */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-2">
            <MapPin size={14} className="text-sky-500" />
            <span className="font-medium">{trip.destination}</span>
          </div>
          <h3 className="font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
            {trip.title || `${trip.destination} Adventure`}
          </h3>
        </div>

        {/* Trip Details */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
          {trip.duration && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">
              <Clock size={12} className="text-sky-500" />
              <span className="font-medium text-xs">{trip.duration}</span>
            </div>
          )}
          {trip.groupSize && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">
              <Users size={12} className="text-green-500" />
              <span className="font-medium text-xs">{trip.groupSize}</span>
            </div>
          )}
          {trip.departureDate && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">
              <Calendar size={12} className="text-purple-500" />
              <span className="font-medium text-xs">{new Date(trip.departureDate).toLocaleDateString('en-IN', { 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {trip.description}
        </p>

        {/* Highlights */}
        {trip.highlights && trip.highlights.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {trip.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 text-sky-700 dark:text-sky-300 rounded-full text-xs font-medium border border-sky-200/50 dark:border-sky-700/50"
                >
                  {highlight}
                </span>
              ))}
              {trip.highlights.length > 3 && (
                <span className="px-2 sm:px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium">
                  +{trip.highlights.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Price Section */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div>
            {trip.originalCost && trip.originalCost > trip.cost && (
              <div className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-through mb-1">
                {formatPrice(trip.originalCost)}
              </div>
            )}
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              {formatPrice(trip.cost)}
            </div>
            <div className="text-slate-500 text-xs sm:text-sm font-medium">per person</div>
          </div>

          {/* Availability */}
          {trip.availableSeats && (
            <div className="text-right">
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {trip.availableSeats} seats left
              </div>
              {trip.totalSeats && (
                <div className="text-xs text-slate-500">of {trip.totalSeats} total</div>
              )}
              {/* Progress Bar */}
              <div className="w-16 sm:w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-2">
                <div 
                  className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${(trip.availableSeats / trip.totalSeats) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Provider Info */}
        {trip.provider && typeof trip.provider === 'object' && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm mb-1">
                  {trip.provider.name}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Users size={10} />
                  {trip.provider.followers?.toLocaleString()} followers
                </div>
              </div>
              {trip.provider.verified && (
                <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold flex items-center gap-1 border border-green-200/50 dark:border-green-700/50">
                  <Shield size={10} />
                  Verified
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCard; 