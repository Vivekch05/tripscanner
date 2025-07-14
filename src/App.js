import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import TripDetailsModal from './components/TripDetailsModal';
import PriceRangeFilter from './components/PriceRangeFilter';
import SortFilter from './components/SortFilter';
import ProviderFilter from './components/ProviderFilter';
import RecentSearches from './components/RecentSearches';
import DarkModeToggle from './components/DarkModeToggle';

// Mock trip data for Indian destinations
const MOCK_TRIPS = [
  { id: '1', destination: 'Goa', provider: 'MakeMyTrip', cost: '₹15,000', description: 'Relaxing beach vacation in North Goa.', imageUrl: 'https://placehold.co/400x250/007bff/ffffff?text=Goa' },
  { id: '2', destination: 'Manali', provider: 'Goibibo', cost: '₹22,500', description: 'Adventure trip to the Himalayas.', imageUrl: 'https://placehold.co/400x250/28a745/ffffff?text=Manali' },
  { id: '3', destination: 'Kerala', provider: 'Yatra', cost: '₹18,000', description: 'Backwaters and houseboat experience in Kerala.', imageUrl: 'https://placehold.co/400x250/10b981/ffffff?text=Kerala' },
  { id: '4', destination: 'Rajasthan', provider: 'EaseMyTrip', cost: '₹25,000', description: 'Royal palaces and desert safari in Rajasthan.', imageUrl: 'https://placehold.co/400x250/f59e42/ffffff?text=Rajasthan' },
  { id: '5', destination: 'Ladakh', provider: 'TravelGuru', cost: '₹35,000', description: 'Scenic road trip to Ladakh and Pangong Lake.', imageUrl: 'https://placehold.co/400x250/6366f1/ffffff?text=Ladakh' },
  { id: '6', destination: 'Andaman & Nicobar', provider: 'MakeMyTrip', cost: '₹28,000', description: 'Island hopping and water sports in Andaman.', imageUrl: 'https://placehold.co/400x250/0ea5e9/ffffff?text=Andaman' },
  { id: '7', destination: 'Uttarakhand', provider: 'Goibibo', cost: '₹19,500', description: 'Nature and spiritual retreat in Uttarakhand.', imageUrl: 'https://placehold.co/400x250/22d3ee/ffffff?text=Uttarakhand' },
  { id: '8', destination: 'Delhi', provider: 'Yatra', cost: '₹12,000', description: 'Historical tour of India’s capital city.', imageUrl: 'https://placehold.co/400x250/64748b/ffffff?text=Delhi' },
  { id: '9', destination: 'Mumbai', provider: 'EaseMyTrip', cost: '₹16,000', description: 'City life and beaches in Mumbai.', imageUrl: 'https://placehold.co/400x250/fbbf24/ffffff?text=Mumbai' },
  { id: '10', destination: 'Bengaluru', provider: 'TravelGuru', cost: '₹14,500', description: 'Tech city and gardens in Bengaluru.', imageUrl: 'https://placehold.co/400x250/34d399/ffffff?text=Bengaluru' },
  { id: '11', destination: 'Goa', provider: 'Goibibo', cost: '₹13,000', description: 'Relaxing beach vacation in North Goa.', imageUrl: 'https://placehold.co/400x250/007bff/ffffff?text=Goa' },
];

// Helper to extract numeric value from cost string
const getCostValue = (cost) => Number(cost.replace(/[^\d]/g, ''));

function App() {
  // State for search/filter/sort
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [price, setPrice] = useState(40000); // default max
  const [sort, setSort] = useState('');
  const [providers, setProviders] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [shareMessage, setShareMessage] = useState('');

  // Find min/max for price slider
  const minPrice = Math.min(...MOCK_TRIPS.map(t => getCostValue(t.cost)));
  const maxPrice = Math.max(...MOCK_TRIPS.map(t => getCostValue(t.cost)));

  // Handle search from SearchForm
  const handleSearch = ({ destination }) => {
    setLoading(true);
    setTimeout(() => {
      // Add to recent searches
      if (destination && !recentSearches.includes(destination)) {
        setRecentSearches([destination, ...recentSearches.slice(0, 4)]);
      }
      // Filter by destination
      let filtered = MOCK_TRIPS.filter(trip =>
        destination.trim() === '' ||
        trip.destination.toLowerCase().includes(destination.trim().toLowerCase())
      );
      // Filter by price
      filtered = filtered.filter(trip => getCostValue(trip.cost) <= price);
      // Filter by provider
      if (providers.length > 0) {
        filtered = filtered.filter(trip => providers.includes(trip.provider));
      }
      // Sort
      if (sort === 'price-asc') {
        filtered = filtered.slice().sort((a, b) => getCostValue(a.cost) - getCostValue(b.cost));
      } else if (sort === 'price-desc') {
        filtered = filtered.slice().sort((a, b) => getCostValue(b.cost) - getCostValue(a.cost));
      } else if (sort === 'provider') {
        filtered = filtered.slice().sort((a, b) => a.provider.localeCompare(b.provider));
      }
      setResults(filtered);
      setLoading(false);
    }, 800);
  };

  // Handle trip card click
  const handleTripClick = (trip) => setSelectedTrip(trip);
  const handleModalClose = () => setSelectedTrip(null);

  // Handle recent search click
  const handleRecentSearch = (destination) => handleSearch({ destination });

  // Favorite handler
  const handleFavorite = (trip) => {
    setFavorites((prev) =>
      prev.some(fav => fav.id === trip.id)
        ? prev.filter(fav => fav.id !== trip.id)
        : [...prev, trip]
    );
  };

  // Share handler
  const handleShare = (trip) => {
    const shareText = `Check out this trip to ${trip.destination} with ${trip.provider} for ${trip.cost}!`;
    if (navigator.share) {
      navigator.share({ title: 'TripScanner India', text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(shareText);
      setShareMessage('Trip details copied to clipboard!');
      setTimeout(() => setShareMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      <Header />
      <main className="max-w-6xl mx-auto px-4">
        <SearchForm onSearch={handleSearch} />
        <RecentSearches searches={recentSearches} onSelect={handleRecentSearch} />
        <div className="flex flex-wrap gap-4 items-center mb-2">
          <PriceRangeFilter min={minPrice} max={maxPrice} value={price} onChange={setPrice} />
          <SortFilter value={sort} onChange={setSort} />
          <ProviderFilter selected={providers} onChange={setProviders} />
        </div>
        <SearchResults
          trips={results}
          loading={loading}
          onTripClick={handleTripClick}
          onFavorite={handleFavorite}
          favorites={favorites}
          onShare={handleShare}
        />
        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="my-12">
            <h2 className="text-2xl font-bold text-sky-700 mb-4">Your Favorite Trips</h2>
            <SearchResults
              trips={favorites}
              loading={false}
              onTripClick={handleTripClick}
              onFavorite={handleFavorite}
              favorites={favorites}
              onShare={handleShare}
            />
          </div>
        )}
        <TripDetailsModal trip={selectedTrip} onClose={handleModalClose} onShare={handleShare} />
        {shareMessage && (
          <div className="fixed bottom-24 right-6 bg-sky-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn">
            {shareMessage}
          </div>
        )}
      </main>
      <DarkModeToggle />
      <footer className="text-center text-slate-400 text-sm my-8">
        &copy; {new Date().getFullYear()} TripScanner India. For demo purposes only.
      </footer>
    </div>
  );
}

export default App;
