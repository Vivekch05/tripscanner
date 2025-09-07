import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Sparkles, ArrowRight, Play, Star, Shield, Clock, TrendingUp } from 'lucide-react';

function HeroSection({ onSearch }) {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const popularDestinations = [
    { name: 'Goa', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', price: '₹15,000', rating: 4.8 },
    { name: 'Manali', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', price: '₹22,000', rating: 4.9 },
    { name: 'Kerala', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', price: '₹18,000', rating: 4.7 },
    { name: 'Rishikesh', image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop', price: '₹12,000', rating: 4.6 }
  ];

  const stats = [
    { number: '500+', label: 'Trips Available', icon: MapPin, color: 'text-blue-500' },
    { number: '50+', label: 'Trusted Providers', icon: Shield, color: 'text-green-500' },
    { number: '10K+', label: 'Happy Travelers', icon: Users, color: 'text-purple-500' },
    { number: '4.8★', label: 'Average Rating', icon: Star, color: 'text-yellow-500' }
  ];

  const testimonials = [
    { name: 'Priya Sharma', location: 'Mumbai', text: 'Amazing experience with verified providers!', rating: 5 },
    { name: 'Raj Patel', location: 'Delhi', text: 'Found the perfect group trip to Goa!', rating: 5 },
    { name: 'Sneha Reddy', location: 'Bangalore', text: 'Trusted platform for solo travelers.', rating: 5 }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 text-sky-700 dark:text-sky-300 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg backdrop-blur-sm border border-sky-200/50 dark:border-sky-700/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles size={16} className="animate-pulse" />
            <span>Discover Amazing Indian Destinations</span>
            <TrendingUp size={16} className="text-green-500" />
          </div>

          {/* Main Heading */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Find Your Perfect
            <span className="block bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
              Indian Adventure
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Connect with trusted Instagram travel groups and private providers across India. 
            Book authentic experiences with verified travel experts and create unforgettable memories.
          </p>

          {/* Enhanced Stats with Animation */}
          <div className={`flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const isActive = index === currentStatIndex;
              return (
                <div 
                  key={index} 
                  className={`text-center p-3 sm:p-4 rounded-xl transition-all duration-500 ${
                    isActive 
                      ? 'bg-white/80 dark:bg-slate-800/80 shadow-xl scale-105 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50' 
                      : 'bg-white/40 dark:bg-slate-800/40 shadow-lg backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30'
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg' : 'bg-slate-100 dark:bg-slate-700'
                  }`}>
                    <IconComponent size={20} className={isActive ? 'text-white' : stat.color} />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold mb-1 transition-all duration-300 ${
                    isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-xs sm:text-sm transition-all duration-300 ${
                    isActive ? 'text-slate-600 dark:text-slate-400 font-medium' : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={() => onSearch({ destination: '', departureDate: '', returnDate: '' })}
              className="btn-mobile group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-sky-600 hover:via-indigo-700 hover:to-purple-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Search size={20} className="relative z-10" />
              <span className="relative z-10">Start Exploring</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="btn-mobile group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-600/50 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800">
              <Play size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Enhanced Popular Destinations */}
        <div className="mt-16 sm:mt-20">
          <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-3 sm:mb-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Popular Destinations
          </h2>
          <p className={`text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center mb-8 sm:mb-12 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Discover the most loved destinations by our travelers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {popularDestinations.map((dest, index) => (
              <button
                key={index}
                onClick={() => onSearch({ destination: dest.name, departureDate: '', returnDate: '' })}
                className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 delay-${1200 + index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 px-2 py-1 rounded-lg text-xs font-semibold">
                  {dest.price}
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-yellow-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <Star size={10} className="fill-current" />
                  {dest.rating}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
                    Explore now
                  </p>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="mt-20">
          <h2 className={`text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-4 transition-all duration-1000 delay-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Why Choose TripScanner?
          </h2>
          <p className={`text-slate-600 dark:text-slate-400 text-center mb-12 transition-all duration-1000 delay-2100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Experience the difference with our trusted platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Providers',
                description: 'All providers are verified and trusted by our community with safety guarantees',
                color: 'from-green-500 to-emerald-600',
                bgColor: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              },
              {
                icon: Calendar,
                title: 'Flexible Dates',
                description: 'Find trips that match your schedule and preferences with easy rescheduling',
                color: 'from-blue-500 to-cyan-600',
                bgColor: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30'
              },
              {
                icon: Users,
                title: 'Group Travel',
                description: 'Join like-minded travelers and make new friends on amazing adventures',
                color: 'from-purple-500 to-pink-600',
                bgColor: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`group text-center p-8 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-xl hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:-translate-y-2 delay-${2200 + index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`text-gradient-to-r ${feature.color} text-white`} size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20">
          <h2 className={`text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-4 transition-all duration-1000 delay-2800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            What Our Travelers Say
          </h2>
          <p className={`text-slate-600 dark:text-slate-400 text-center mb-12 transition-all duration-1000 delay-2900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Real experiences from real travelers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`p-6 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm transition-all duration-1000 delay-${3000 + index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white dark:text-slate-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default HeroSection;
