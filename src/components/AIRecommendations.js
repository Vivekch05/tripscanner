import React, { useState } from 'react';
import { Sparkles, MapPin, Calendar, Users, DollarSign, Star, ArrowRight, Loader2, X } from 'lucide-react';

const AIRecommendations = ({ onTripSelect, onClose }) => {
  const [preferences, setPreferences] = useState({
    budget: '',
    duration: '',
    groupSize: '',
    interests: [],
    season: '',
    difficulty: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const interestOptions = [
    'Adventure', 'Beach', 'Mountains', 'Culture', 'Wildlife', 'Spiritual',
    'Food', 'Photography', 'Trekking', 'Relaxation', 'Nightlife', 'History'
  ];

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 'ai-1',
          destination: 'Goa',
          title: 'AI Recommended: Goa Beach Paradise',
          description: 'Perfect for your budget and love for beaches and nightlife',
          cost: 15000,
          duration: '4 Days',
          groupSize: '6-12 people',
          rating: 4.8,
          matchScore: 95,
          reasons: ['Fits your budget perfectly', 'Great for beach lovers', 'Vibrant nightlife'],
          imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
        },
        {
          id: 'ai-2',
          destination: 'Manali',
          title: 'AI Recommended: Manali Adventure',
          description: 'Ideal for adventure seekers and mountain lovers',
          cost: 22000,
          duration: '5 Days',
          groupSize: '4-8 people',
          rating: 4.9,
          matchScore: 88,
          reasons: ['Perfect for adventure activities', 'Beautiful mountain views', 'Great for photography'],
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
        },
        {
          id: 'ai-3',
          destination: 'Kerala',
          title: 'AI Recommended: Kerala Backwaters',
          description: 'Relaxing experience perfect for your preferences',
          cost: 18000,
          duration: '6 Days',
          groupSize: '8-15 people',
          rating: 4.7,
          matchScore: 82,
          reasons: ['Peaceful and relaxing', 'Rich cultural experience', 'Great for food lovers'],
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsGenerating(false);
    }, 2000);
  };

  const handleInterestToggle = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                AI Trip Recommendations
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Tell us your preferences and get personalized trip suggestions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            <X size={24} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="overflow-auto max-h-[70vh]">
          {recommendations.length === 0 ? (
            /* Preferences Form */
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={preferences.budget}
                    onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select Budget</option>
                    <option value="under-10k">Under ₹10,000</option>
                    <option value="10k-25k">₹10,000 - ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="above-50k">Above ₹50,000</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Trip Duration
                  </label>
                  <select
                    value={preferences.duration}
                    onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select Duration</option>
                    <option value="weekend">Weekend (2-3 days)</option>
                    <option value="short">Short (4-5 days)</option>
                    <option value="medium">Medium (6-8 days)</option>
                    <option value="long">Long (9+ days)</option>
                  </select>
                </div>

                {/* Group Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Group Size
                  </label>
                  <select
                    value={preferences.groupSize}
                    onChange={(e) => setPreferences(prev => ({ ...prev, groupSize: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select Group Size</option>
                    <option value="solo">Solo Travel</option>
                    <option value="couple">Couple</option>
                    <option value="small">Small Group (3-6)</option>
                    <option value="large">Large Group (7+)</option>
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Preferred Season
                  </label>
                  <select
                    value={preferences.season}
                    onChange={(e) => setPreferences(prev => ({ ...prev, season: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select Season</option>
                    <option value="summer">Summer</option>
                    <option value="monsoon">Monsoon</option>
                    <option value="winter">Winter</option>
                    <option value="any">Any Season</option>
                  </select>
                </div>
              </div>

              {/* Interests */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Your Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        preferences.interests.includes(interest)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={generateRecommendations}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating Recommendations...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Get AI Recommendations
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Recommendations Display */
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Your Personalized Recommendations
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Based on your preferences, here are the best trips for you
                </p>
              </div>

              <div className="space-y-6">
                {recommendations.map((trip, index) => (
                  <div
                    key={trip.id}
                    className="bg-white dark:bg-slate-700 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-600 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={trip.imageUrl}
                          alt={trip.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                                AI MATCH {trip.matchScore}%
                              </span>
                              <div className="flex items-center gap-1">
                                <Star size={16} className="text-yellow-500 fill-current" />
                                <span className="text-slate-600 dark:text-slate-400 text-sm">{trip.rating}</span>
                              </div>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                              {trip.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                              {trip.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {formatPrice(trip.cost)}
                            </div>
                            <div className="text-sm text-slate-500">per person</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Calendar size={16} />
                            <span className="text-sm">{trip.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Users size={16} />
                            <span className="text-sm">{trip.groupSize}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <MapPin size={16} />
                            <span className="text-sm">{trip.destination}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            Why this trip matches you:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {trip.reasons.map((reason, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => onTripSelect(trip)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg hover:from-sky-600 hover:to-indigo-700 transition-all duration-200 font-medium"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => onTripSelect(trip)}
                            className="px-6 py-2 bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-500 transition-colors duration-200 font-medium"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setRecommendations([])}
                  className="px-6 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200"
                >
                  Try Different Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
