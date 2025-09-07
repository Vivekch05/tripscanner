const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to make API calls
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Trips
  async getTrips(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/trips?${params}`);
  }

  async getTrip(id) {
    return this.request(`/trips/${id}`);
  }

  async searchTrips(query) {
    return this.request(`/trips/search/${encodeURIComponent(query)}`);
  }

  async getPopularDestinations() {
    return this.request('/trips/destinations/popular');
  }

  async getTripFilters() {
    return this.request('/trips/filters/options');
  }

  async getSimilarTrips(tripId, limit = 6) {
    return this.request(`/trips/${tripId}/similar?limit=${limit}`);
  }

  async getTripStats() {
    return this.request('/trips/stats/overview');
  }

  // Providers
  async getProviders(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/providers?${params}`);
  }

  async getProvider(id) {
    return this.request(`/providers/${id}`);
  }

  async registerAsProvider(providerData) {
    return this.request('/providers/register', {
      method: 'POST',
      body: JSON.stringify(providerData),
    });
  }

  async getProviderDashboard() {
    return this.request('/providers/dashboard/stats');
  }

  // Bookings
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getMyBookings() {
    return this.request('/bookings/my');
  }

  async getBooking(id) {
    return this.request(`/bookings/${id}`);
  }

  async createPaymentIntent(bookingId) {
    return this.request(`/bookings/${bookingId}/payment`, {
      method: 'POST',
    });
  }

  async confirmPayment(bookingId, paymentIntentId) {
    return this.request(`/bookings/${bookingId}/confirm-payment`, {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    });
  }

  async cancelBooking(bookingId, reason) {
    return this.request(`/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  // User management
  async updateUserPreferences(preferences) {
    return this.request('/users/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  async addToFavorites(tripId) {
    return this.request('/users/favorites', {
      method: 'POST',
      body: JSON.stringify({ tripId }),
    });
  }

  async removeFromFavorites(tripId) {
    return this.request(`/users/favorites/${tripId}`, {
      method: 'DELETE',
    });
  }

  async getFavorites() {
    return this.request('/favorites');
  }

  // Favorites (new dedicated endpoint)
  async addToFavoritesNew(tripId) {
    return this.request(`/favorites/${tripId}`, {
      method: 'POST',
    });
  }

  async removeFromFavoritesNew(tripId) {
    return this.request(`/favorites/${tripId}`, {
      method: 'DELETE',
    });
  }

  async checkFavorite(tripId) {
    return this.request(`/favorites/check/${tripId}`);
  }

  // AI Recommendations
  async getAIRecommendations(preferences) {
    return this.request('/recommendations/ai', {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
  }

  async getPersonalizedRecommendations() {
    return this.request('/recommendations/personalized');
  }

  async getTrendingDestinations(limit = 10) {
    return this.request(`/recommendations/trending?limit=${limit}`);
  }

  // Trip Comparison
  async compareTrips(tripIds) {
    return this.request('/comparison/compare', {
      method: 'POST',
      body: JSON.stringify({ tripIds }),
    });
  }

  async getComparisonSuggestions(tripId, limit = 5) {
    return this.request(`/comparison/suggestions/${tripId}?limit=${limit}`);
  }

  async getComparisonAnalytics(tripIds) {
    return this.request('/comparison/analytics', {
      method: 'POST',
      body: JSON.stringify({ tripIds }),
    });
  }

  // Chat
  async getChatConversations() {
    return this.request('/chat/conversations');
  }

  async createChatConversation(providerId, tripId = null) {
    return this.request('/chat/conversation', {
      method: 'POST',
      body: JSON.stringify({ providerId, tripId }),
    });
  }

  async getChatMessages(conversationId, page = 1, limit = 50) {
    return this.request(`/chat/conversation/${conversationId}/messages?page=${page}&limit=${limit}`);
  }

  async sendChatMessage(conversationId, content, type = 'text') {
    return this.request(`/chat/conversation/${conversationId}/message`, {
      method: 'POST',
      body: JSON.stringify({ content, type }),
    });
  }

  async markChatAsRead(conversationId) {
    return this.request(`/chat/conversation/${conversationId}/read`, {
      method: 'PUT',
    });
  }

  async getUnreadMessageCount() {
    return this.request('/chat/unread-count');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
