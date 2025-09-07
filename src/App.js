import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import TripDetailsModal from './components/TripDetailsModal';
import PriceRangeFilter from './components/PriceRangeFilter';
import SortFilter from './components/SortFilter';
import ProviderFilter from './components/ProviderFilter';
import RecentSearches from './components/RecentSearches';
import DarkModeToggle from './components/DarkModeToggle';
import TripComparison from './components/TripComparison';
import AIRecommendations from './components/AIRecommendations';
import LiveChat from './components/LiveChat';
import apiService from './services/api';

// Fallback mock data in case API is not available
const FALLBACK_TRIPS = [
  { 
    id: '1', 
    destination: 'Goa', 
    title: 'Goa Beach Paradise',
    provider: { name: 'Wanderlust Adventures', type: 'Instagram Group', followers: 45200, verified: true },
    cost: 15000,
    originalCost: 18000,
    discount: 17,
    description: 'Relaxing beach vacation in North Goa with water sports and nightlife.', 
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    duration: '4 Days',
    groupSize: '6-12 people',
    departureDate: '2024-02-15',
    returnDate: '2024-02-19',
    availableSeats: 8,
    totalSeats: 12,
    rating: 4.8,
    totalReviews: 127,
    highlights: ['Beach Activities', 'Water Sports', 'Nightlife', 'Local Cuisine'],
    includes: ['Accommodation', 'Meals', 'Transport', 'Guide'],
    excludes: ['Flights', 'Personal Expenses', 'Insurance']
  },
  { 
    id: '2', 
    destination: 'Manali', 
    title: 'Manali Adventure Trek',
    provider: { name: 'Mountain Explorers', type: 'Private Provider', followers: 28900, verified: true },
    cost: 22500,
    originalCost: 25000,
    discount: 10,
    description: 'Adventure trip to the Himalayas with trekking and camping.', 
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    duration: '5 Days',
    groupSize: '4-8 people',
    departureDate: '2024-02-20',
    returnDate: '2024-02-25',
    availableSeats: 6,
    totalSeats: 8,
    rating: 4.9,
    totalReviews: 89,
    highlights: ['Mountain Trekking', 'Camping', 'Scenic Views', 'Adventure Sports'],
    includes: ['Accommodation', 'Meals', 'Equipment', 'Expert Guide'],
    excludes: ['Flights', 'Personal Gear', 'Insurance']
  },
  { 
    id: '3', 
    destination: 'Kerala', 
    title: 'Kerala Backwaters Experience',
    provider: { name: 'Kerala Dreams', type: 'Travel Agency', followers: 67300, verified: true },
    cost: 18000,
    originalCost: 22000,
    discount: 18,
    description: 'Backwaters and houseboat experience in Kerala with Ayurveda.', 
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    duration: '6 Days',
    groupSize: '8-15 people',
    departureDate: '2024-02-25',
    returnDate: '2024-03-02',
    availableSeats: 12,
    totalSeats: 15,
    rating: 4.7,
    totalReviews: 156,
    highlights: ['Houseboat Cruise', 'Ayurveda Spa', 'Tea Gardens', 'Cultural Shows'],
    includes: ['Houseboat Stay', 'Meals', 'Ayurveda Session', 'Cultural Tour'],
    excludes: ['Flights', 'Spa Treatments', 'Personal Expenses']
  }
];

// Helper to extract numeric value from cost
const getCostValue = (cost) => {
  if (typeof cost === 'number') return cost;
  return Number(cost.toString().replace(/[^\d]/g, ''));
};

function App() {
  // State for search/filter/sort
  const [results, setResults] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [providers, setProviders] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [price, setPrice] = useState(40000);
  const [sort, setSort] = useState('');
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [shareMessage, setShareMessage] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);
  const [isSharing, setIsSharing] = useState(false); // Add sharing state
  const [comparisonTrips, setComparisonTrips] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatProvider, setChatProvider] = useState(null);

  // Find min/max for price slider
  const minPrice = allTrips.length > 0 ? Math.min(...allTrips.map(t => getCostValue(t.cost))) : 5000;
  const maxPrice = allTrips.length > 0 ? Math.max(...allTrips.map(t => getCostValue(t.cost))) : 50000;

  // Initialize app data
  useEffect(() => {
    initializeApp();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeApp = async () => {
    try {
      setInitialLoading(true);
      
      // Check API health
      try {
        await apiService.healthCheck();
        setApiConnected(true);
        console.log('✅ API connected successfully');
      } catch (error) {
        console.log('⚠️ API not available, using fallback data');
        setApiConnected(false);
      }

      // Load initial data
      await Promise.all([
        loadTrips(),
        loadProviders(),
        loadPopularDestinations(),
        loadUserProfile(),
        loadFavorites()
      ]);

    } catch (error) {
      console.error('Initialization error:', error);
      setError('Failed to load initial data. Please refresh the page.');
    } finally {
      setInitialLoading(false);
    }
  };

  const loadTrips = async () => {
    try {
      if (apiConnected) {
        const response = await apiService.getTrips();
        setAllTrips(response.trips || []);
        setResults(response.trips || []);
      } else {
        setAllTrips(FALLBACK_TRIPS);
        setResults(FALLBACK_TRIPS);
      }
    } catch (error) {
      console.error('Failed to load trips:', error);
      setAllTrips(FALLBACK_TRIPS);
      setResults(FALLBACK_TRIPS);
    }
  };

  const loadProviders = async () => {
    try {
      if (apiConnected) {
        const response = await apiService.getProviders();
        setProviders(response.providers || []);
      } else {
        // Fallback providers
        setProviders([
          { name: 'Wanderlust Adventures', type: 'Instagram Group', followers: 45200, verified: true },
          { name: 'Mountain Explorers', type: 'Private Provider', followers: 28900, verified: true },
          { name: 'Kerala Dreams', type: 'Travel Agency', followers: 67300, verified: true }
        ]);
      }
    } catch (error) {
      console.error('Failed to load providers:', error);
    }
  };

  const loadPopularDestinations = async () => {
    try {
      if (apiConnected) {
        const response = await apiService.getPopularDestinations();
        setPopularDestinations(response.destinations || []);
      } else {
        setPopularDestinations([
          { _id: 'Goa', count: 15 },
          { _id: 'Manali', count: 12 },
          { _id: 'Kerala', count: 10 },
          { _id: 'Rishikesh', count: 8 }
        ]);
      }
    } catch (error) {
      console.error('Failed to load popular destinations:', error);
    }
  };

  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token && apiConnected) {
        const response = await apiService.getProfile();
        setUser(response.user);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      localStorage.removeItem('token');
    }
  };

  const loadFavorites = async () => {
    try {
      if (user && apiConnected) {
        const response = await apiService.getFavorites();
        setFavorites(response.favorites || []);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  // Handle search from SearchForm
  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setShowHero(false);
    
    // Ensure destination is a string
    const destination = searchParams.destination || '';
    const destinationStr = typeof destination === 'string' ? destination : '';
    
    try {
      // Add to recent searches
      if (destinationStr && !recentSearches.some(s => 
        typeof s === 'string' ? s === destinationStr : s.destination === destinationStr
      )) {
        const newSearch = {
          destination: destinationStr,
          departureDate: searchParams.departureDate || '',
          returnDate: searchParams.returnDate || '',
          travelers: searchParams.travelers || 1,
          timestamp: new Date().toISOString()
        };
        setRecentSearches([newSearch, ...recentSearches.slice(0, 4)]);
      }
      
      let filteredTrips = allTrips;
      
      // Use API search if available and destination is provided
      if (apiConnected && destinationStr.trim()) {
        try {
          const response = await apiService.searchTrips(destinationStr);
          filteredTrips = response.trips || [];
        } catch (error) {
          console.error('API search failed, using local filter:', error);
          // Fallback to local filtering
          filteredTrips = allTrips.filter(trip =>
            trip.destination.toLowerCase().includes(destinationStr.trim().toLowerCase())
          );
        }
      } else if (destinationStr.trim()) {
        // Local filtering
        filteredTrips = allTrips.filter(trip =>
          trip.destination.toLowerCase().includes(destinationStr.trim().toLowerCase())
        );
      }
      
      // Apply additional filters
      filteredTrips = filteredTrips.filter(trip => getCostValue(trip.cost) <= price);
      
      if (selectedProviders.length > 0) {
        filteredTrips = filteredTrips.filter(trip => 
          selectedProviders.includes(trip.provider.name)
        );
      }
      
      // Apply sorting
      if (sort === 'price-low') {
        filteredTrips = filteredTrips.slice().sort((a, b) => getCostValue(a.cost) - getCostValue(b.cost));
      } else if (sort === 'price-high') {
        filteredTrips = filteredTrips.slice().sort((a, b) => getCostValue(b.cost) - getCostValue(a.cost));
      } else if (sort === 'rating') {
        filteredTrips = filteredTrips.slice().sort((a, b) => b.rating - a.rating);
      } else if (sort === 'date') {
        filteredTrips = filteredTrips.slice().sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));
      }
      
      setResults(filteredTrips);
    } catch (error) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle trip card click
  const handleTripClick = async (trip) => {
    try {
      if (apiConnected) {
        // Fetch full trip details from API
        const response = await apiService.getTrip(trip.id || trip._id);
        setSelectedTrip(response.trip);
      } else {
        setSelectedTrip(trip);
      }
    } catch (error) {
      console.error('Failed to load trip details:', error);
      setSelectedTrip(trip);
    }
  };

  const handleModalClose = () => setSelectedTrip(null);

  // Handle recent search click
  const handleRecentSearch = (searchData) => {
    if (typeof searchData === 'string') {
      handleSearch({ destination: searchData });
    } else {
      handleSearch(searchData);
    }
  };

  // Handle clear recent search
  const handleClearRecentSearch = (index) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  // Handle clear all recent searches
  const handleClearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  // Favorite handler
  const handleFavorite = async (trip) => {
    try {
      if (apiConnected && user) {
        const tripId = trip.id || trip._id;
        const isFavorited = favorites.some(fav => (fav.id || fav._id) === tripId);
        
        if (isFavorited) {
          await apiService.removeFromFavorites(tripId);
        } else {
          await apiService.addToFavorites(tripId);
        }
        
        // Reload favorites
        await loadFavorites();
      } else {
        // Local favorites management
        setFavorites((prev) =>
          prev.some(fav => fav.id === trip.id)
            ? prev.filter(fav => fav.id !== trip.id)
            : [...prev, trip]
        );
      }
    } catch (error) {
      console.error('Failed to update favorites:', error);
      setError('Failed to update favorites. Please try again.');
    }
  };

  // Share handler with proper state management
  const handleShare = async (trip) => {
    // Prevent multiple concurrent share operations
    if (isSharing) {
      setShareMessage('Please wait, sharing in progress...');
      return;
    }

    setIsSharing(true);
    setShareMessage(''); // Clear any previous messages
    
    try {
      const shareText = `Check out this amazing trip to ${trip.destination} with ${trip.provider.name} for ₹${trip.cost.toLocaleString()}! 🏖️✈️`;
      const shareUrl = window.location.href;
      
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: 'TripScanner India - Amazing Trip Found!',
          text: shareText,
          url: shareUrl
        };
        
        // Check if the share data can be shared
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          setShareMessage('Trip shared successfully! 🎉');
        } else {
          // Fallback to clipboard
          await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          setShareMessage('Trip details copied to clipboard! 📋');
        }
      } else {
        // Fallback for browsers without Web Share API
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        setShareMessage('Trip details copied to clipboard! 📋');
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setShareMessage(''), 3000);
      
    } catch (error) {
      console.error('Share error:', error);
      
      // Handle specific share errors
      if (error.name === 'AbortError') {
        setShareMessage('Share was cancelled');
      } else if (error.name === 'NotAllowedError') {
        setShareMessage('Share permission denied');
      } else if (error.name === 'NotSupportedError') {
        setShareMessage('Sharing not supported on this device');
      } else {
        // Fallback to clipboard
        try {
          const fallbackText = `Check out this trip to ${trip.destination} with ${trip.provider.name} for ₹${trip.cost.toLocaleString()}!`;
          await navigator.clipboard.writeText(fallbackText);
          setShareMessage('Trip details copied to clipboard! 📋');
        } catch (clipboardError) {
          console.error('Clipboard error:', clipboardError);
          setShareMessage('Unable to share or copy to clipboard');
        }
      }
      
      // Clear error message after 3 seconds
      setTimeout(() => setShareMessage(''), 3000);
    } finally {
      setIsSharing(false);
    }
  };

  // Handle search click from header
  const handleSearchClick = () => {
    setShowHero(false);
  };

  // Handle authentication
  const handleAuth = async (action, data) => {
    try {
      if (action === 'logout') {
        setUser(null);
        setFavorites([]);
        localStorage.removeItem('token');
      } else if (action === 'login') {
        if (apiConnected) {
          const response = await apiService.login(data);
          localStorage.setItem('token', response.token);
          setUser(response.user);
          await loadFavorites();
        } else {
          // Mock login
          setUser({ name: 'Demo User', email: 'demo@example.com' });
        }
      } else if (action === 'register') {
        if (apiConnected) {
          const response = await apiService.register(data);
          localStorage.setItem('token', response.token);
          setUser(response.user);
        } else {
          // Mock registration
          setUser({ name: 'Demo User', email: 'demo@example.com' });
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please try again.');
    }
  };

  // Handle trip comparison
  const handleAddToComparison = (trip) => {
    if (comparisonTrips.length < 3 && !comparisonTrips.some(t => t.id === trip.id)) {
      setComparisonTrips([...comparisonTrips, trip]);
    }
  };

  const handleRemoveFromComparison = (tripId) => {
    setComparisonTrips(comparisonTrips.filter(t => t.id !== tripId));
  };

  const handleOpenComparison = () => {
    if (comparisonTrips.length > 0) {
      setShowComparison(true);
    }
  };

  // Handle AI recommendations
  const handleAITripSelect = (trip) => {
    setSelectedTrip(trip);
    setShowAIRecommendations(false);
  };

  // Handle live chat
  const handleOpenChat = (provider) => {
    setChatProvider(provider);
    setShowLiveChat(true);
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
            <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Loading TripScanner...
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {apiConnected ? 'Connected to API' : 'Using offline mode'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      <Header 
        user={user} 
        onAuth={handleAuth} 
        onSearchClick={handleSearchClick}
        onAIRecommendations={() => setShowAIRecommendations(true)}
        onComparison={handleOpenComparison}
        comparisonCount={comparisonTrips.length}
      />
      
      {showHero ? (
        <HeroSection onSearch={handleSearch} />
      ) : (
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <SearchForm onSearch={handleSearch} popularDestinations={popularDestinations} />
          
          <RecentSearches 
            searches={recentSearches} 
            onSearch={handleRecentSearch}
            onClearSearch={handleClearRecentSearch}
            onClearAll={handleClearAllRecentSearches}
          />
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-1 space-y-3 sm:space-y-4">
              <PriceRangeFilter 
                price={price} 
                setPrice={setPrice} 
                minPrice={minPrice} 
                maxPrice={maxPrice} 
              />
              <SortFilter sort={sort} setSort={setSort} />
              <ProviderFilter 
                providers={providers}
                selectedProviders={selectedProviders} 
                setSelectedProviders={setSelectedProviders} 
              />
            </div>
            
            <div className="lg:col-span-3">
              <SearchResults
                trips={results}
                loading={loading}
                onTripClick={handleTripClick}
                onFavorite={handleFavorite}
                favorites={favorites}
                onShare={handleShare}
                searchQuery={results.length > 0 ? results[0]?.destination : ''}
                onAddToComparison={handleAddToComparison}
                onOpenChat={handleOpenChat}
              />
            </div>
          </div>
          
          {/* Favorites Section */}
          {favorites.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 sm:mb-6">Your Favorite Trips</h2>
              <SearchResults
                trips={favorites}
                loading={false}
                onTripClick={handleTripClick}
                onFavorite={handleFavorite}
                favorites={favorites}
                onShare={handleShare}
                onAddToComparison={handleAddToComparison}
                onOpenChat={handleOpenChat}
              />
            </div>
          )}
        </main>
      )}
      
      <TripDetailsModal 
        trip={selectedTrip} 
        onClose={handleModalClose} 
        onShare={handleShare}
        onFavorite={handleFavorite}
        isFavorited={selectedTrip ? favorites.some(fav => (fav.id || fav._id) === (selectedTrip.id || selectedTrip._id)) : false}
      />

      {/* Trip Comparison Modal */}
      {showComparison && (
        <TripComparison
          trips={comparisonTrips}
          onClose={() => setShowComparison(false)}
          onRemoveTrip={handleRemoveFromComparison}
          onFavorite={handleFavorite}
          onShare={handleShare}
          favorites={favorites}
        />
      )}

      {/* AI Recommendations Modal */}
      {showAIRecommendations && (
        <AIRecommendations
          onTripSelect={handleAITripSelect}
          onClose={() => setShowAIRecommendations(false)}
        />
      )}

      {/* Live Chat */}
      {showLiveChat && (
        <LiveChat
          provider={chatProvider}
          onClose={() => setShowLiveChat(false)}
        />
      )}
      
      {shareMessage && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 bg-sky-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn text-sm sm:text-base">
          {shareMessage}
        </div>
      )}
      
      {/* Global Sharing Indicator */}
      {isSharing && (
        <div className="fixed top-3 sm:top-4 right-3 sm:right-4 bg-sky-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 text-sm sm:text-base">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Sharing...</span>
        </div>
      )}
      
      <DarkModeToggle />
      
      <footer className="text-center text-slate-400 text-xs sm:text-sm my-6 sm:my-8 px-3 sm:px-4">
        &copy; {new Date().getFullYear()} TripScanner India. 
        {apiConnected ? ' Connected to API' : ' Offline Mode'}
      </footer>
    </div>
  );
}

export default App;
